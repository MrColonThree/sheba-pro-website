import useAxiosSecure from "./useAxiosSecure";

const useSaveUser = async (user) => {
  const axiosSecure = useAxiosSecure();
  const currentUser = {
    email: user.email,
    role: "admin",
    status: "Verified",
  };
  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);

  return data;
};
export default useSaveUser;
