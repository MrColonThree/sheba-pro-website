import useBookings from "../../../Hooks/useBookings";
import { DotLoader } from "react-spinners";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
const Bookings = () => {
  const [bookings, isLoading, refetch] = useBookings();
  const axiosSecure = useAxiosSecure();
  console.log(bookings);
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
  const totalPrice = bookings?.reduce(
    (total, service) => total + service.price,
    0
  );
  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      showCloseButton: true,
      closeButtonColor: "#d33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel booking!",
      closeButtonText: `
      <GrClose/>
  `,
      cancelButtonAriaLabel: "Thumbs down",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Canceled!",
              text: "Your booking has been canceled successfully.",
              icon: "success",
            });
          }
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
              Your Bookings: {bookings.length}
            </h2>
            <h2 className="p-2 pl-5 text-2xl font-semibold bg-white">
              Total Price: ${totalPrice}
            </h2>
            <h2 className="pl-5 text-xl font-semibold">
              {bookings.length === 0 ? (
                <button
                  disabled
                  className="bg-red-500 px-2 py-1 rounded-lg text-white"
                >
                  Pay
                </button>
              ) : (
                <Link to="/dashboard/payment">
                  <button className="bg-red-500 px-2 py-1 rounded-lg text-white">
                    Pay
                  </button>
                </Link>
              )}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead className="bg-black text-primary border text-white">
                <tr className="text-left">
                  <th className="p-3 md:text-lg">Service</th>
                  <th className="p-3 md:text-lg">Booking Date</th>
                  <th className="p-3 md:text-lg">Service Date</th>
                  <th className="p-3 md:text-lg">Price</th>
                  <th className="p-3 md:text-lg text-center">Status</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {bookings &&
                  bookings.map((booking) => (
                    <TableRow
                      key={booking._id}
                      service={booking.title}
                      category={booking.service}
                      bookingDate={booking.bookingDate}
                      serviceDate={booking.serviceDate}
                      price={booking.price}
                      status={booking.status}
                      id={booking._id}
                      action="Cancel"
                      handleCancelBooking={handleCancelBooking}
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
  service,
  bookingDate,
  serviceDate,
  price,
  status,
  action,
  category,
  id,
  handleCancelBooking,
}) {
  return (
    <tr className="border-b border-opacity-20 bg-secondary/30  border-x">
      <td className="p-3">
        <p className="md:text-base">{service}</p>
        <p>{category}</p>
      </td>
      <td className="p-3 text-sm">
        <p>{bookingDate}</p>
      </td>
      <td className="p-3">
        <p>{serviceDate}</p>
      </td>
      <td className="p-3">
        <p>${price}</p>
      </td>
      <td className="py-2">
        <p
          className={`${
            status === "Pending"
              ? "bg-blue-50 text-blue-600"
              : "bg-green-50 text-green-600"
          } py-1 px-1 rounded-full text-center font-semibold`}
        >
          {status}
        </p>
      </td>
      <td className="p-3 text-right">
        <span className="px-3 py-1 font-semibold rounded-md">
          {status !== "Pending" ? (
            <button
              disabled
              className="py-1 px-2 bg-secondary rounded-md font-semibold text-gray-700 duration-300 transform"
            >
              {action}
            </button>
          ) : (
            <button
              onClick={() => handleCancelBooking(id)}
              className="py-1 px-2 bg-secondary rounded-md font-semibold text-red-600  duration-300 transform"
            >
              {action}
            </button>
          )}
        </span>
      </td>
    </tr>
  );
}

export default Bookings;
