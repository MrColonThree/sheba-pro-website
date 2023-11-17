import {
  BsArrowUpCircle,
  BsFacebook,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleGotToTop = () => {
    window.scrollTo(0, 0);
  };
  const presentDate = new Date();
  const presentYear = presentDate.getFullYear();
  return (
    <footer className="bg-teal-50 w-full">
      <div className="container px-6 py-8 mx-auto">
        <div className="relative inline-block group">
          <div className="text-2xl lg:text-4xl md:text-3xl hover:text-red-500">
            <button onClick={handleGotToTop}>
              <BsArrowUpCircle />
            </button>
          </div>
          <div className="hidden group-hover:block bg-gray-800 text-white text-center rounded p-2 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 w-28">
            Go to top
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <Link to="/">
            <img className="w-auto h-10" src="/logo.png" alt="" />
          </Link>

          <div className="flex flex-wrap justify-center mt-6 -mx-4">
            <a
              href="#"
              className="mx-4 text-sm transition-colors duration-300 hover:text-red-500 "
              aria-label="Reddit"
            >
              Home
            </a>

            <a
              href="#"
              className="mx-4 text-sm transition-colors duration-300 hover:text-red-500 "
              aria-label="Reddit"
            >
              About
            </a>

            <a
              href="#"
              className="mx-4 text-sm transition-colors duration-300 hover:text-red-500 "
              aria-label="Reddit"
            >
              Teams
            </a>

            <a
              href="#"
              className="mx-4 text-sm transition-colors duration-300 hover:text-red-500 "
              aria-label="Reddit"
            >
              Privacy
            </a>

            <a
              href="#"
              className="mx-4 text-sm transition-colors duration-300 hover:text-red-500 "
              aria-label="Reddit"
            >
              Cookies
            </a>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-10" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-black/70">
            © Copyright <span>{presentYear}</span>. All Rights Reserved.
          </p>

          <div className="flex items-center -mx-2">
            <a
              href="#"
              className="mx-2 transition-colors duration-300 hover:text-red-500"
              aria-label="Reddit"
            >
              <BsLinkedin />
            </a>

            <a
              href="#"
              className="mx-2 transition-colors duration-300 dark:text-gray-300 hover:text-red-500"
              aria-label="Facebook"
            >
              <BsFacebook />
            </a>

            <a
              href="#"
              className="mx-2 transition-colors duration-300 dark:text-gray-300 hover:text-red-500"
              aria-label="Github"
            >
              <BsGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
