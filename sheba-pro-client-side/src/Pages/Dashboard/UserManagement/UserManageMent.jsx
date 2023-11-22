import { DotLoader } from "react-spinners";
import Swal from "sweetalert2";
import { GrEdit, GrTrash } from "react-icons/gr";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useGetUsers from "../../../Hooks/useGetUsers";
const UserManagement = () => {
  const [users, isPending, refetch] = useGetUsers();
  const axiosSecure = useAxiosSecure();
  console.log(users);
  if (isPending) {
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
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      showCloseButton: true,
      closeButtonColor: "#d33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete User!",
      cancelButtonAriaLabel: "Thumbs down",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Selected user has been deleted successfully.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleUpdateUser = (id) => {
    console.log(id);
    axiosSecure.patch(`/users/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Confirmed!",
          text: "Selected user's role has been updated successfully.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="flex flex-wrap justify-between items-center my-10">
            <h2 className="p-2 pl-5 text-2xl font-semibold bg-white">
              Total Users: {users.length}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead className="bg-black text-primary border text-white">
                <tr className="text-left">
                  <th></th>
                  <th className="p-3 md:text-lg">Name</th>
                  <th className="p-3 md:text-lg">Email</th>
                  <th className="p-3 md:text-lg text-center">Role</th>
                  <th className="p-3 md:text-lg text-center">Edit</th>
                  <th className="p-3 md:text-lg text-right">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, idx) => (
                    <TableRow
                      key={user._id}
                      user={user.name}
                      email={user.email}
                      photo={user.photo}
                      id={user._id}
                      role={user.role}
                      handleDeleteUser={handleDeleteUser}
                      handleUpdateUser={handleUpdateUser}
                      idx={idx}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
function TableRow({
  user,
  email,
  role,
  handleDeleteUser,
  handleUpdateUser,
  id,
  photo,
  idx,
}) {
  return (
    <tr className="border-b border-opacity-20 bg-secondary/30  border-x">
      <td className="p-3">{idx + 1}</td>
      <td className="p-3">
        {/* <p className="md:text-base">{user}</p> */}
        <div className="flex items-center gap-x-2">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src={
              photo ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            }
            alt=""
          />
          <div>
            <h2 className="font-medium md:text-base text-gray-800 dark:text-white ">
              {user}
            </h2>
            <p className="text-sm font-normal text-gray-600 dark:text-gray-400 lowercase">
              @{user.split(" ")}
            </p>
          </div>
        </div>
      </td>
      <td className="p-3">
        <p className="md:text-base">{email}</p>
      </td>
      <td className="text-center">
        {role === "guest" ? (
          <button
            disabled
            className="bg-blue-50 text-blue-600 py-1 px-3 rounded-full text-center font-semibold"
          >
            User
          </button>
        ) : (
          <>
            {role === "admin" ? (
              <button
                disabled
                className="bg-purple-50 text-purple-600 py-1 px-3 rounded-full text-center font-semibold"
              >
                Admin
              </button>
            ) : (
              <button
                disabled
                className="bg-orange-50 text-orange-600 py-1 px-3 rounded-full text-center font-semibold"
              >
                Host
              </button>
            )}
          </>
        )}
      </td>
      <td className="text-center">
        {role === "admin" ? (
          <button
            disabled
            className="bg-gray-50 text-gray-600 p-1 md:text-lg rounded-full text-center font-semibold"
          >
            <GrEdit />
          </button>
        ) : (
          <button
            onClick={() => handleUpdateUser(id)}
            className="bg-purple-50 text-purple-600 p-1 md:text-lg rounded-full text-center font-semibold"
          >
            <GrEdit />
          </button>
        )}
      </td>
      <td className="p-3 text-right">
        <span className="px-3 py-1 font-semibold rounded-md">
          {role === "admin" ? (
            <button
              disabled
              className="p-1 bg-secondary rounded-md font-semibold md:text-lg bg-gray-50 text-gray-700 duration-300 transform"
            >
              <GrTrash />
            </button>
          ) : (
            <button
              onClick={() => handleDeleteUser(id)}
              className="p-1 bg-secondary rounded-md font-semibold md:text-lg bg-red-50 text-red-600  duration-300 transform"
            >
              <GrTrash />
            </button>
          )}
        </span>
      </td>
    </tr>
  );
}

export default UserManagement;
