import { createBrowserRouter } from "react-router-dom";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import Home from "../Pages/Home/Home/Home";
import MainLayout from "../Layouts/MainLayout";
import Bookings from "../Pages/Bookings/Bookings/Bookings";
import Contact from "../Pages/Contact/Contact/Contact";
import Services from "../Pages/Services/Services/Services";
import ServiceDetails from "../Components/ServiceDetails";

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
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/services",
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
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

export default Route;
