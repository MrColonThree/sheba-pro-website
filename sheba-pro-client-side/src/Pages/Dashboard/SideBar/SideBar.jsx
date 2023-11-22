import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { GrHome, GrMoney } from "react-icons/gr";
import useAdmin from "../../../Hooks/useAdmin";
import useAuth from "../../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useBookings from "../../../Hooks/useBookings";
import useGetUsers from "../../../Hooks/useGetUsers";
import { DotLoader } from "react-spinners";
export default function Sidebar() {
  const { user, logOut } = useAuth();
  const [admin] = useAdmin();
  const [bookings, isLoading] = useBookings();
  const [users] = useGetUsers();
  console.log(admin);
  const navigate = useNavigate();
  const handleSignOut = () => {
    logOut();
    navigate("/");
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "User logged out successfully",
      showConfirmButton: false,
      timer: 1000,
    });
  };
  if (isLoading) {
    return (
      <div className="w-60 flex h-screen items-center justify-center">
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
    <Card className=" w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 hidden lg:block">
      <div className="mb-2 p-4">
        <img src="/logo.png" className="h-12" alt="" />
      </div>
      <List>
        {user && !admin && (
          <>
            <Link to="/dashboard/userHome">
              <ListItem>
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                User Home
              </ListItem>
            </Link>

            <Link to="/dashboard/bookings">
              <ListItem>
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                My Bookings
                <ListItemSuffix>
                  <Chip
                    value={bookings?.length || 0}
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </Link>

            <Link to="/dashboard/paymentHistory">
              <ListItem>
                <ListItemPrefix>
                  <GrMoney className="h-5 w-5" />
                </ListItemPrefix>
                Payment History
              </ListItem>
            </Link>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
          </>
        )}
        {user && admin && (
          <>
            <Link to="/dashboard/adminHome">
              <ListItem>
                <ListItemPrefix>
                  <GrHome className="h-5 w-5" />
                </ListItemPrefix>
                Admin Home
              </ListItem>
            </Link>
            <Link to="/dashboard/users">
              <ListItem>
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                User Management
                <ListItemSuffix>
                  <Chip
                    value={users?.length}
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </Link>
            <Link to="/dashboard/services">
              <ListItem>
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                Service Management
                <ListItemSuffix>
                  <Chip
                    value="14"
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </Link>
            <Link to="/dashboard/bookingManagement">
              <ListItem>
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                Booking Management
                <ListItemSuffix>
                  <Chip
                    value={bookings?.length}
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </Link>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Analytics
            </ListItem>
          </>
        )}
        <Link to="/">
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Home
          </ListItem>{" "}
        </Link>
        <Link to="/services">
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Services
          </ListItem>{" "}
        </Link>
        <button onClick={handleSignOut}>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </button>
      </List>
    </Card>
  );
}
