import signUpImg from "../../assets/images/signUp.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const SignIn = () => {
  const { signIn, googleSignIn } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then(() => {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User created successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => console.log(error));
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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User created successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
        axiosSecure.post("/users", saveUser).then((res) => {
          if (res.data.insertedId) {
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
        <title>Sheba Pro | Sign In</title>
      </Helmet>
      <div className="px-4 py-10 lg:py-24 mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row shadow-2xl bg-base-100 items-center md:p-10">
          <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-[500px] p-5 rounded-lg h-96 md:h-auto">
            <img src={signUpImg} alt="" />
          </div>
          <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-[500px] p-5 rounded-lg">
            <h1 className="text-4xl font-semibold text-center text-gray-900">
              Sign In
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
                  Create a password
                </span>
                <input
                  className="w-full p-2 border rounded-lg outline-purple-600"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                />
              </label>
              <p>
                Don't have an account?
                <Link
                  to="/signUp"
                  className="font-semibold text-purple-600 ml-2"
                >
                  Sign Up
                </Link>
              </p>
              <input
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-lg"
                value="Sign In"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
