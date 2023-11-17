import { BsInstagram, BsStarFill, BsWhatsapp } from "react-icons/bs";
import { LuFacebook } from "react-icons/lu";
import { GrSelect } from "react-icons/gr";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import BookingModal from "./BookingModal";
const ServiceDetails = () => {
  const { title, service, long_details, price, rating, short_details } =
    useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  const bookInfo = { title, service, price };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="container mx-auto px-5">
      <div className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="service"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://thumbs.dreamstime.com/z/hand-writing-our-services-marker-business-concept-background-215861505.jpg"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-md title-font text-gray-600 tracking-widest">
                {service}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <BsStarFill className="text-red-500 text-lg" />
                  <p className="text-gray-600 mx-3">{rating}</p>
                </span>
                <span className="flex gap-2 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <LuFacebook className="hover:text-red-500" />
                  <BsInstagram className="hover:text-red-500" />
                  <BsWhatsapp className="hover:text-red-500" />
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{short_details}</h3>
              <p className="leading-relaxed">{long_details}</p>
              <div className="flex mt-5 relative">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${price.min} - ${price.max}
                </span>
                <button
                  onClick={openModal}
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                >
                  Booking
                </button>
                <button
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                  disabled
                >
                  <GrSelect className="text-xl" />
                </button>
                <BookingModal
                  closeModal={closeModal}
                  bookInfo={bookInfo}
                  isOpen={isOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
