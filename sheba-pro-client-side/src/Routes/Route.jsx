import { createBrowserRouter } from "react-router-dom";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import Home from "../Pages/Home/Home/Home";
import MainLayout from "../Layouts/MainLayout";
import Bookings from "../Pages/Bookings/Bookings/Bookings";
import Contact from "../Pages/Contact/Contact/Contact";
import Services from "../Pages/Services/Services/Services";
import ServiceDetails from "../Components/ServiceDetails";
import DashBoard from "../Layouts/DashBoard";
import UserManageMent from "../Pages/Dashboard/UserManagement/UserManageMent";
import ServiceManageMent from "../Pages/Dashboard/ServiceManagement/ServiceManageMent";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/Paymenthistory";
import BookingManagement from "../Pages/Dashboard/BookingManagement/BookingManagement";
import Payment from "../Pages/Dashboard/BookingManagement/Payment";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/services/:service?",
        element: <Services />,
      },
      {
        path: "/service/details/:id",
        element: <ServiceDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/service/details/${params.id}`),
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashBoard />,
    children: [
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "users",
        element: <UserManageMent />,
      },
      {
        path: "services",
        element: <ServiceManageMent />,
      },
      {
        path: "bookingManagement",
        element: <BookingManagement />,
      },
      {
        path: "userHome",
        element: <UserHome />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
    ],
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

export default Route;
