import { Outlet } from "react-router-dom";
import SideBar from "../Pages/Dashboard/SideBar/SideBar";
const DashBoard = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row max-w-7xl mx-auto border-x-2 border-black">
      <div>
        <SideBar />
      </div>
      <div className="border-l-2">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
