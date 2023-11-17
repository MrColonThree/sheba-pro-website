import { Link } from "react-router-dom";

const ServiceCard = ({ card }) => {
  const { title, short_details, service, price, _id } = card;
  return (
    <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg flex flex-col mx-auto">
      <div className="flex-grow">
        <div className="px-4 py-2">
          <h2 className="text-center font-semibold text-red-500 mb-1">
            {service}
          </h2>
          <h1 className="text-xl font-bold text-gray-800 uppercase ">
            {title}
          </h1>
          <p className="mt-1 text-sm text-gray-600 ">{short_details}</p>
        </div>
      </div>

      <img
        className="object-cover w-full h-48 mt-2"
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80"
        alt="NIKE AIR"
      />

      <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
        <h1 className="text-lg font-bold text-white">
          ${price.min} - ${price.max}
        </h1>
        <Link to={`/service/details/${_id}`}>
          <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
            View details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
