
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const useGetUsers = () => {
  const axiosSecure = useAxiosSecure();
  const usersData = async () =>
    await axiosSecure("/users").then((res) => res.data);
  const {
    data: users = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: usersData,
  });
  console.log(users);
  return [users, isPending, refetch];
};

export default useGetUsers;
