import {  useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <section className="bg-slate-200">
        <div className="container flex items-center justify-center text-center min-h-screen px-6 py-12 mx-auto">
          <div>
            <p className="text-5xl font-medium text-base-orange">
              {error.status}
            </p>
            <p className="text-5xl font-medium text-base-orange">
              {error.statusText}
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              We can’t find that page
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Sorry, the page you are looking for doesn&apos;t exist or has been
              moved.
            </p>

            <div className="flex items-center justify-center mt-6 gap-x-3">
              <button
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-base-orange border rounded-lg gap-x-2 sm:w-auto  hover:bg-base-green hover:text-white"
                onClick={() => window.history.back()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>

                <span>Go back</span>
              </button>

              <button
                className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-base-green rounded-lg shrink-0 sm:w-auto hover:bg-base-orange "
                onClick={() => (window.location.href = "/")}
              >
                Take me home
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
