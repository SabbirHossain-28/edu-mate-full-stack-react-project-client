import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SiSololearn } from "react-icons/si";
import registerbg from "../../assets/images/registerbg/register.gif";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading/Loading";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, userLogOut, updateUser, googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = { image: data.photo[0] };
    const res = await axiosCommon.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      createUser(data?.email, data?.password).then((userCredential) => {
        if (userCredential) {
          updateUser(data?.name, res.data?.data?.display_url).then(() => {
            const userData = {
              name: data?.name,
              email: data?.email,
              phone: data?.phone,
              image: res.data?.data?.display_url,
              role: "Student",
            };
            axiosCommon.post("/users", userData).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Registration Successfull",
                  text: `Welcome! ${data?.name} You are now member of EduMate.Please login to explore`,
                  icon: "success",
                  confirmButtonColor: "#F2871D",
                  background: "#07332F",
                  color: "#F2871D",
                }).then((result) => {
                  if (result.isConfirmed) {
                    setLoading(false);
                    userLogOut();
                    navigate("/login");
                  }
                });
              }
            });
          });
        }
      });
    }
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((userCredential) => {
        if (userCredential) {
          const userInfo = {
            name: userCredential.user?.displayName,
            email: userCredential.user?.email,
            image: userCredential.user?.photoURL,
            role: "Student",
            phone: userCredential.user?.phoneNumber,
          };
          axiosCommon.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Google Login Successfull",
                text: "You successfully login with your google account",
                icon: "success",
                background: "#07332F",
                color: "#F2871D",
              });
            }
          });
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("There is something error happen", error);
      });
  };

  const handlePasswordShowToggler = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading></Loading>
      </div>
    );
  }
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto  rounded-tl-[60px] rounded-tr-[60px] rounded-bl-[60px] rounded-br-[60px] bg-[#07332F]">
        <div className="flex p-8 min-h-screen">
          <div
            className="hidden bg-cover bg-center lg:block lg:w-1/2 rounded-tl-[60px] rounded-bl-[60px] rounded-br-[60px] rounded-tr-[60px] border-[#F2871D] border-r-4"
            style={{
              backgroundImage: `url(${registerbg})`,
            }}
          >
            <div className="flex h-full items-center py-10 px-10 bg-gray-800 bg-opacity-60 rounded-tl-[60px] rounded-br-[60px] rounded-tr-[60px] rounded-bl-[60px] ">
              <div className="text-center">
                <h4 className="text-5xl font-pop  font-bold text-[#F2871D]">
                  Join EduMate Today!!
                </h4>
                <p className="max-w-2xl mt-3 text-gray-200 font-poppin">
                  Create your account to unlock a world of educational
                  resources, personalized learning experiences, and connect with
                  a vibrant community of educators and learners. Your journey to
                  knowledge starts here!
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-1/2">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <SiSololearn className="text-[#F2871D] text-5xl"></SiSololearn>
                </div>
                <p className="mt-3 text-gray-500 dark:text-gray-300 font-poppin">
                  Register your account with us
                </p>
              </div>

              <div className="mt-4">
                <form onSubmit={handleSubmit(onSubmit)} className="font-inter">
                  <div className="relative flex items-center mt-8">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>

                    <input
                      type="text"
                      className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:bg-gray-900 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Username"
                      {...register("name", {
                        required: "UserName is required",
                      })}
                    />
                  </div>
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}

                  <div className="relative flex items-center mt-6">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <input
                      type="email"
                      className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Email address"
                      {...register("email", { required: "Email is required" })}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}

                  <div>
                    <label
                      htmlFor="dropzone-file"
                      className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>

                      <h2 className="mx-3 text-gray-400">Profile Photo</h2>

                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        {...register("photo", {
                          required: "Profile photo is required",
                        })}
                      />
                    </label>
                  </div>
                  {errors.photo && (
                    <span className="text-red-500 text-sm">
                      {errors.photo.message}
                    </span>
                  )}

                  <div className="relative flex items-center mt-6">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 10v1a11 11 0 0011 11h1l2-2a2 2 0 012-2h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3a2 2 0 00-2 2v2l-2 2a9 9 0 01-9-9l2-2h2a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v3l-2 2z"
                        />
                      </svg>
                    </span>
                    <input
                      type="tel"
                      className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Phone number"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Only numbers are allowed",
                        },
                      })}
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      {errors.phone.message}
                    </span>
                  )}

                  <div className="relative flex items-center mt-4">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Password must be at least 8 characters long",
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
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-gray-500">
                      Already have an account?
                      <Link to="/login" className="underline">
                        Login
                      </Link>
                    </p>

                    <button
                      type="submit"
                      className="inline-block rounded-lg bg-[#F2871D] px-5 py-2 text-sm font-medium text-white"
                    >
                      Register
                    </button>
                  </div>
                </form>
                <div className="mt-3">
                  <span className="relative flex justify-center mb-3">
                    <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

                    <span className="relative z-10  text-white px-2 rounded-full font-lora">
                      OR
                    </span>
                  </span>
                  <button
                    onClick={handleGoogleLogin}
                    className="bg-white flex items-center text-gray-700 dark:text-gray-300 justify-center gap-x-3 text-sm sm:text-base  dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5 w-full font-inter"
                  >
                    <svg
                      className="w-5 h-5 sm:h-6 sm:w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_3033_94454)">
                        <path
                          d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z"
                          fill="#FBBC04"
                        />
                        <path
                          d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z"
                          fill="#EA4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3033_94454">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span>Log in with Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
