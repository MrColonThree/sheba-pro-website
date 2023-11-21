import signUpImg from "../../assets/images/signUp.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const SignUp = () => {
  const { signUp, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    signUp(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateUserProfile(data.name, data.photo)
        .then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            role: "guest",
          };
          axiosSecure.post("/users", saveUser).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const saveUser = {
          name: user.displayName,
          email: user.email,
          role: "guest",
        };
        axiosSecure.post("/users", saveUser).then((res) => {
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Helmet>
        <title>Sheba Pro | Sign Up</title>
      </Helmet>
      <div className="px-4 py-10 lg:py-24 mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row-reverse shadow-2xl bg-base-100 items-center">
          <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-[500px] p-5 rounded-lg h-96 md:h-auto">
            <img src={signUpImg} alt="" />
          </div>
          <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-[500px] p-5 rounded-lg">
            <h1 className="text-4xl font-semibold text-center text-gray-900">
              Sign up
            </h1>
            <div className="pb-6 space-y-2 border-b border-gray-200">
              <button
                onClick={handleGoogleSignIn}
                className="w-full py-3 flex items-center justify-center gap-2 font-semibold text-white bg-lime-500 hover:bg-lime-600 rounded-lg"
              >
                <BsGoogle />
                Continue with Google
              </button>
              <button className="w-full py-3 flex items-center justify-center gap-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg">
                <BsGithub />
                Continue with Github
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <label className="block">
                <span className="block mb-1 text-sm font-medium text-gray-700">
                  Name
                </span>
                <input
                  className="w-full p-2 border rounded-lg outline-purple-600"
                  type="text"
                  placeholder="Your full name"
                  name="name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </label>

              <label className="block">
                <span className="block mb-1 text-sm font-medium text-gray-700">
                  Your Email
                </span>
                <input
                  className="w-full p-2 border rounded-lg outline-purple-600"
                  type="email"
                  name="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </label>

              <label className="block">
                <span className="block mb-1 text-sm font-medium text-gray-700">
                  Photo
                </span>
                <input
                  className="w-full p-2 border rounded-lg outline-purple-600"
                  type="text"
                  placeholder="Your profile photo url"
                  name="photo"
                  {...register("photo", { required: true })}
                />
                {errors.photo && (
                  <span className="text-red-600">Photo url is required</span>
                )}
              </label>

              <label className="block">
                <span className="block mb-1 text-sm font-medium text-gray-700">
                  Create a password
                </span>
                <input
                  className="w-full p-2 border rounded-lg outline-purple-600"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                />
                <p className="mt-1 text-sm">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
              </label>
              <p>
                Already have account?
                <Link to="/signIn" className="font-semibold text-purple-600 ml-2">
                  Sign In
                </Link>
              </p>
              <input
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-lg"
                value="Sign Up"
              />
            </form>
            <p className="my-8 text-xs font-medium text-center text-gray-700">
              By clicking "Sign Up" you agree to our
              <a
                href="#"
                className="text-purple-700 hover:text-purple-900 mx-1"
              >
                Terms of Service
              </a>
              and
              <a
                href="#"
                className="text-purple-700 hover:text-purple-900 ml-1"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
