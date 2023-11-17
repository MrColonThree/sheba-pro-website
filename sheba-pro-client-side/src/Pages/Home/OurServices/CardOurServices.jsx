import { Link } from "react-router-dom";

const CardOurServices = ({ item }) => {
  const { service, short_title, service_cover } = item;

  return (
    <Link
      to={`/services/${service}`}
      className="flex flex-col items-center justify-center w-full max-w-sm mx-auto hover:scale-105 transition transform duration-300"
    >
      <div
        className="w-full h-64 bg-center bg-cover rounded-lg shadow-md bg-blend-darken bg-black/20 hover:bg-red-50"
        style={{
          backgroundImage: `url("${service_cover}")`,
        }}
      ></div>

      <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64">
        <h3 className="py-2 font-bold tracking-wide text-center text-red-600 uppercase ">
          {service}
        </h3>

        <div className="px-3 py-2 bg-gray-200 text-center">
          <p className="font-bold text-gray-800 ">{short_title}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardOurServices;
