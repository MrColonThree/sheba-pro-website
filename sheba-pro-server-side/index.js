const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.edvzxqj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// middlewares
const logger = (req, res, next) => {
  console.log("log: info", req.method, req.url);
  next();
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const allServiceCollection = client
      .db("shebaPro")
      .collection("allServices");
    const serviceCollection = client.db("shebaPro").collection("services");
    const bookingCollection = client.db("shebaPro").collection("bookings");
    const userCollection = client.db("shebaPro").collection("users");
    const paymentCollection = client.db("shebaPro").collection("payments");

    const verifyToken = (req, res, next) => {
      const token = req?.cookies?.token;
      // console.log(token);
      if (!token) {
        return res.status(401).send({ message: "unauthorized access" });
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return res.status(401).send({ message: "unauthorized access" });
        }
        req.user = decoded;
        next();
      });
    };
    // verify admin middleware
    // const verifyAdmin = async (req, res, next) => {
    //   const email = req.decoded.email;
    //   const query = { email: email };
    //   const user = await userCollection.findOne(query);
    //   const isAdmin = user?.role === "admin";
    //   if (!isAdmin) {
    //     return res.status(403).send({ message: "forbidden access" });
    //   }
    //   next();
    // };
    // auth related api
    app.post("/jwt", logger, async (req, res) => {
      const user = req.body;
      // console.log("user for token", user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send({ success: true });
    });

    app.post("/logout", async (req, res) => {
      // console.log("Logged out", user);
      res
        .clearCookie("token", {
          maxAge: 0,
          secure: process.env.NODE_ENV === "production" ? true : false,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ status: true });
    });
    // service by category
    app.get("/services", async (req, res) => {
      const services = await serviceCollection.find().toArray();
      res.send(services);
    });
    // allServices by specific category
    app.get("/service/:service", async (req, res) => {
      const service = req.params.service;
      const query = { service: service };
      const result = await allServiceCollection.find(query).toArray();
      res.send(result);
    });
    // to get specific service details
    app.get("/service/details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allServiceCollection.findOne(query);
      res.send(result);
    });
    // to post booked service data
    app.post("/bookings", verifyToken, async (req, res) => {
      const service = req.body;
      const result = await bookingCollection.insertOne(service);
      res.send(result);
    });
    // to get bookings data
    app.get("/bookings", verifyToken, async (req, res) => {
      const email = req.query.email;
      const role = req.query.role;
      let query = {};
      if (role !== "admin") {
        query.email = email;
      }
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
    });
    // to cancel / delete bookings
    app.delete("/bookings/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });
    // to update booking status
    app.patch("/bookings/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedBooking = {
        $set: {
          status: "Confirmed",
        },
      };
      const result = await bookingCollection.updateOne(filter, updatedBooking);
      res.send(result);
    });
    // payment intent
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(price);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "inr",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });
    app.get("/payments/:email", verifyToken, async (req, res) => {
      const query = { email: req.params.email };
      // console.log(req.decoded,"ok");
      // if (req.params.email !== req.decoded?.email) {
      //   return res.status(403).send({ message: "forbidden access" });
      // }
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/payments", verifyToken, async (req, res) => {
      const payment = req.body;
      console.log(payment);
      const paymentResult = await paymentCollection.insertOne(payment);

      //  carefully delete each item from the cart
      console.log("payment info", payment);
      const query = {
        _id: {
          $in: payment.bookingIds.map((id) => new ObjectId(id)),
        },
      };

      const deleteResult = await bookingCollection.deleteMany(query);

      res.send({ paymentResult, deleteResult });
    });
    // services related api
    app.get("/featured", async (req, res) => {
      const cursor = allServiceCollection.aggregate([{ $sample: { size: 6 } }]);
      const result = await cursor.toArray();
      res.send(result);
    });
    //  users related api
    app.get("/users", verifyToken, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });
    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }

      res.send({ admin });
    });
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const isExist = await userCollection.findOne(query);
      if (isExist) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    // to delete specific user
    app.delete("/users/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    // to update specific user's role
    app.patch("/users/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedUser = {
        $set: {
          role: "host",
        },
      };
      const result = await userCollection.updateOne(filter, updatedUser);
      res.send(result);
    });
    // admin stats
    app.get("/admin-stats", verifyToken, async (req, res) => {
      const users = await userCollection.estimatedDocumentCount();
      const totalServices = await allServiceCollection.estimatedDocumentCount();
      const orders = await paymentCollection.estimatedDocumentCount();
      // revenue
      const result = await paymentCollection
        .aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$price" },
            },
          },
        ])
        .toArray();
      const revenue = result.length > 0 ? result[0].totalRevenue : 0;
      res.send({
        users,
        totalServices,
        orders,
        revenue,
      });
    });

    // order status
    app.get("/order-stats", async (req, res) => {
      const result = await paymentCollection
        .aggregate([
          {
            $unwind: "$orderedServiceIds",
          },
          {
            $lookup: {
              from: "allServices",
              localField: "orderedServiceIds",
              foreignField: "service_id",
              as: "orderedServices",
            },
          },
          {
            $unwind: "$orderedServices",
          },
          {
            $group: {
              _id: "$orderedServices.service",
              quantity: {
                $sum: 1,
              },
              totalRevenue: { $sum : '$orderedServices.price' },
            },
          },
        ])
        .toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Sheba is running");
});

app.listen(port, () => {
  console.log(`Sheba Pro Server is running on port ${port}`);
});
