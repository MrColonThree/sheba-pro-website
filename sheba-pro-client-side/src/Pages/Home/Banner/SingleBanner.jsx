import { Link } from "react-router-dom";

const SingleBanner = ({ banner, index }) => {
  const { title, backgroundImage, details, buttonText, buttonLink } = banner;

  return (
    <div
      className={`flex ${
        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
      } items-center justify-between max-w-7xl mx-auto md:py-20 h-[250px] md:h-auto`}
    >
      <div className="w-1/2">
        <img className="lg:h-[500px]" src={backgroundImage} alt="" />
      </div>
      <div
        className={`${
          index % 2 === 0 ? "text-left" : "text-right"
        } space-y-2 w-1/2`}
      >
        <h1 className=" md:text-3xl lg:text-5xl font-semibold">{title}</h1>
        <p className="text-sm md:text-base lg:text-lg">{details}</p>

        <Link to={buttonLink}>
          <button className="text-sm md:text-base lg:text-lg font-semibold bg-red-600 px-2 py-0.5 text-white rounded-xl mt-1 hover:scale-150 hover:bg-red-500">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleBanner;
