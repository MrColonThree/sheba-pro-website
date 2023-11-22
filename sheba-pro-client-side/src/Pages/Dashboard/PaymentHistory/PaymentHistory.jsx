import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="my-20 px-5 md:px-10">
      <h1 className="text-3xl font-semibold mb-10">
        Total Payments :{payments.length}
      </h1>
      <div className="w-full">
        <table>
          <thead>
            <th>Email</th>
            <th>Service Type</th>
            <th>Total Price</th>
            <th>Payment Time</th>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.email}</td>
                <td>Order</td>
                <td>{payment.price}</td>
                <td>
                  {payment.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
