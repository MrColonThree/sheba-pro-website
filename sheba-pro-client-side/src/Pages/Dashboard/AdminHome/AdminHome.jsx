import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { DotLoader } from "react-spinners";
import { GrMoney,  GrServices, GrUser } from "react-icons/gr";
import { FiTruck } from "react-icons/fi";
const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  if (isLoading) {
    return (
      <div className="w-full">
        <DotLoader
          color="#ff0800"
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="mx-auto"
        />
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-3xl">
        Hi, Welcome <span>{user?.displayName ? user.displayName : "Back"}</span>
      </h2>
      <div className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <GrMoney className="text-6xl text-amber-500 mx-auto" />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {stats.revenue}
                </h2>
                <p className="leading-relaxed">Revenue</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <GrUser className="text-lime-500 mx-auto text-6xl" />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {stats.users}
                </h2>
                <p className="leading-relaxed">Users</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <GrServices className="text-slate-500 mx-auto text-6xl" />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {stats.totalServices}
                </h2>
                <p className="leading-relaxed">Files</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <FiTruck className="text-orange-500 mx-auto text-6xl" />
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {stats.orders}
                </h2>
                <p className="leading-relaxed">Orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
