import { Outlet } from "react-router-dom";
import CustomizeNavbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <CustomizeNavbar />
      <div className="min-h-[calc(100vh-392px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
