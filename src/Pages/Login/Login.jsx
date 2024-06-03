import Lottie from "react-lottie";
import lottie1 from "../../../public/Animation - 1717455909200.json";
import { Link } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handlePasswordShowToggler = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="max-w-7xl mx-auto my-12 shadow-2xl rounded-xl">
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Welcome Back to EduMate!
            </h1>
            <p className="mt-4 text-gray-500">
              Login to access your personalized educational resources, track
              your progress, and connect with our community of learners and
              educators. Lets continue your learning journey together!
            </p>
          </div>

          <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-lg"
                  placeholder="Enter email"
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
                />

                <span
                  onClick={handlePasswordShowToggler}
                  className="absolute right-2 top-4"
                >
                  {showPassword ? (
                    <IoMdEyeOff className="text-gray-400 text-xl"></IoMdEyeOff>
                  ) : (
                    <IoMdEye className="text-gray-400 text-xl "></IoMdEye>
                  )}
                </span>
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
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <Lottie options={defaultOptions} height="100%" width="100%" />
        </div>
      </section>
    </div>
  );
};

export default Login;
