import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAdmin from "./useAdmin";

const useBookings = () => {
  const { user } = useAuth();
  const [admin] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const {
    data: bookings,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "bookings",admin],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?email=${user.email}&role=${admin ? "admin" : "guest"}`
      );
      return res.data;
    },
  });

  console.log(bookings);
  return [bookings, isLoading, refetch];
};

export default useBookings;
