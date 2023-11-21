import { GrClose } from "react-icons/gr";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useDateFormat from "../Hooks/useDateFormat";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const BookingModal = ({ closeModal, bookInfo, isOpen }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [servicingDate, setServicingDate] = useState(new Date());
  const { title, service, price } = bookInfo;
  // const { min, max } = price;
  const serviceCharge =
    Math.floor(Math.random() * (price?.max - price?.min + 1)) + price?.min;
  const presentDate = new Date();
  const bookingDate = useDateFormat(presentDate);
  const serviceDate = useDateFormat(servicingDate);
  console.log(serviceDate);
  const handleBooking = (e) => {
    e.preventDefault();
    const form = e.target;
    const additionalInfo = form.additionalInfo.value;
    const bookingInfo = {
      name: user?.displayName,
      email: user?.email,
      service,
      title,
      price: serviceCharge,
      additionalInfo,
      bookingDate,
      serviceDate,
    };
    axiosSecure
      .post("/bookings", bookingInfo)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire("Booked!", "Congrats, booking successful.", "success");
        }
        navigate("/dashboard/bookings");
      });
  };

  return (
    <div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center ">
            <div className="w-full max-w-xl p-6 sm:align-middle bg-white border-2 shadow-xl">
              <div className="text-right">
                <button onClick={closeModal} className="p-1 hover:bg-gray-200">
                  <GrClose />
                </button>
              </div>
              <form onSubmit={handleBooking} className="mt-4 space-y-3">
                <h1 className="text-center text-xl text-black font-semibold">
                  Booking Form
                </h1>
                <div className="flex flex-col md:flex-row gap-5  w-full">
                  <div className="w-full">
                    <label className="text-sm text-gray-700 dark:text-gray-200">
                      Name
                    </label>

                    <label className="block mt-3">
                      <input
                        type="text"
                        name="name"
                        defaultValue={user.displayName}
                        className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                        disabled
                      />
                    </label>
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-gray-700">
                      Email address
                    </label>

                    <label className="block mt-3">
                      <input
                        type="email"
                        name="email"
                        defaultValue={user.email}
                        className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                        disabled
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5  w-full">
                  <div className="w-full">
                    <label className="text-sm text-gray-700 dark:text-gray-200 flex justify-between gap-5">
                      Service <span className="ml-2">Type : {service}</span>
                    </label>

                    <label className="block mt-3">
                      <input
                        type="text"
                        name="title"
                        defaultValue={title}
                        className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                        disabled
                      />
                    </label>
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-gray-700 dark:text-gray-200">
                      Service Charge (USD)
                    </label>

                    <label className="block mt-3">
                      <input
                        type="text"
                        name="price"
                        defaultValue={serviceCharge}
                        className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                        disabled
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5  w-full">
                  <div className="w-full">
                    <label className="text-sm text-gray-700 dark:text-gray-200 flex justify-between gap-5">
                      Booking Date
                    </label>

                    <label className="block mt-3">
                      <input
                        type="text"
                        name="bookingDate"
                        defaultValue={bookingDate}
                        className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                        disabled
                      />
                    </label>
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-gray-700 dark:text-gray-200">
                      Servicing Date
                    </label>
                    <label className="block mt-3">
                      <DatePicker
                        className=" rounded-md focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 w-full  text-sm text-gray-700 bg-white border border-gray-200 "
                        selected={servicingDate}
                        onChange={(date) => setServicingDate(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={presentDate}
                        showIcon
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-700 mb-1">
                    Additional Instructions or Preferences
                  </label>
                  <textarea
                    name="additionalInfo"
                    className="border border-gray-300  focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 rounded-md p-2"
                    rows="3"
                  />
                </div>
                <div className="text-center py-5">
                  <button
                    type="submit"
                    className=" text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingModal;
