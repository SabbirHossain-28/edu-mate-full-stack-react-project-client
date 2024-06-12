import { SiSololearn } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-base-green dark:bg-gray-900">
        <div className="container px-6 py-12 mx-auto">
          <div className="md:flex md:-mx-3 md:items-center md:justify-between">
            <h1 className="text-xl font-semibold tracking-tight text-gray-800 md:mx-3 xl:text-2xl dark:text-white">
              Subscribe to our newsletter to get updates.
            </h1>

            <div className="mt-6 md:mx-3 shrink-0 md:mt-0 md:w-auto">
              <p className="inline-flex items-center justify-center w-full px-4 py-2 text-sm text-white duration-300 bg-gray-800 rounded-lg gap-x-3 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                <Link to={"/register"}>
                  {" "}
                  <span>Sign Up Now</span>
                </Link>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </p>
            </div>
          </div>

          <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="border border-gray-200 dark:border-gray-700 rounded-e-md  flex flex-col items-center p-2">
              <p className="font-semibold text-gray-800 dark:text-white">
                Quick Link
              </p>

              <div className="flex flex-col items-center mt-5 space-y-2">
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                  Home
                </a>
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                  Blogs
                </a>
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                All Class
                </a>
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                  TeachOn EduMate
                </a>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-e-md  flex flex-col items-center p-2">
              <p className="font-semibold text-gray-800 dark:text-white">
                Sponsors
              </p>

              <div className="flex flex-col items-center mt-5 space-y-2">
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                Coursera
                </a>
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                  EduHub
                </a>
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                  Udemy
                </a>
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                Edx
                </a>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-e-md  flex flex-col items-center p-2">
              <p className="font-semibold text-gray-800 dark:text-white">
                Services
              </p>

              <div className="flex flex-col items-center mt-5 space-y-2">
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                  Courses
                </a>
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                  Traininng
                </a>
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                  Internship
                </a>
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                  Certification
                </a>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-e-md  flex flex-col items-center p-2">
              <p className="font-semibold text-gray-800 dark:text-white">
                Community
              </p>

              <div className="flex flex-col items-center mt-5 space-y-2">
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                 GitHub
                </a>
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                Twitter
                </a>
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                  Facbook
                </a>
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                  Youtube
                </a>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-e-md  flex flex-col items-center p-2">
              <p className="font-semibold text-gray-800 dark:text-white">
                Contact Us
              </p>

              <div className="flex flex-col items-center mt-5 space-y-2">
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                  +880 768 473 4978
                </a>
                <a className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">
                  info@edumate.com
                </a>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

          <div className="flex flex-col items-center justify-between sm:flex-row">
            <div className="flex items-center gap-1 text-3xl font-pop">
              <SiSololearn className="text-[#F2871D]"></SiSololearn>
              <p className="text-[#F2871D]">EduMate</p>
            </div>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">
              © Copyright 2024. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
