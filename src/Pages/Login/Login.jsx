import Lottie from "react-lottie";
import lottie1 from "../../../public/Animation - 1717455909200.json";
import { Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(null);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFormData(data);
    // setIsModalOpen(true);
  };

  const handlePasswordShowToggler = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="max-w-7xl mx-auto my-12 shadow-2xl rounded-xl bg-[#07332F]">
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl text-white">
              Welcome Back to EduMate!
            </h1>
            <p className="mt-4 text-gray-500">
              Login to access your personalized educational resources, track
              your progress, and connect with our community of learners and
              educators. Lets continue your learning journey together!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-lg"
                  placeholder="Enter email"
                  {...register("email", { required: "Email is required" })}
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-lg"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message:
                        "Password must be no more than 20 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message:
                        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  })}
                />

                <span
                  onClick={handlePasswordShowToggler}
                  className="absolute right-4 top-4"
                >
                  {showPassword ? (
                    <IoMdEyeOff className="text-gray-400 text-xl"></IoMdEyeOff>
                  ) : (
                    <IoMdEye className="text-gray-400 text-xl "></IoMdEye>
                  )}
                </span>
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account?
                <Link to="/register" className="underline">
                  Sign up
                </Link>
              </p>

              <button
                type="submit"
                className="inline-block rounded-lg bg-[#F2871D] px-5 py-3 text-sm font-medium text-white"
              >
                Log in
              </button>
            </div>
          </form>
          <div className="mt-4">
            <span className="flex items-center">
              <span className="h-px flex-1 bg-black"></span>
              <span className="shrink-0 px-6 text-white">OR</span>
              <span className="h-px flex-1 bg-black"></span>
            </span>
            <div className="flex justify-center mt-4">
              <button className="text-white flex items-center text-lg gap-2 border p-2 rounded-xl">
                <FcGoogle className="text-2xl"></FcGoogle>Continue with Google
              </button>
            </div>
          </div>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <Lottie options={defaultOptions} height="100%" width="100%" />
        </div>
      </section>
    </div>
  );
};

export default Login;
