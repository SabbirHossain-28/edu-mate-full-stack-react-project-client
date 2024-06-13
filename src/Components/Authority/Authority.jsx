// import SectionHeader from "../../Shared/SectionHeader/SectionHeader";

const Authority = () => {
  const authority = [
    {
      name: "Sabbir Hossain",
      position: "Founder/CEO",
      image: "https://i.ibb.co/n6WpG6Z/Profile-Photot.jpg",
    },
    {
      name: "Anthokhiya Pronoy",
      position: "Co-Founder/CO",
      image:
        "https://i.ibb.co/qy2WtCb/323330655-1318006575645512-6565788529966253377-n.jpg",
    },
    {
      name: "Shafiq Nayeem",
      position: "Technical Head",
      image:
        "https://i.ibb.co/4185q1y/343741261-6500349683309827-5999669273081380432-n.jpg",
    },
    {
      name: "Habibullah Akandh",
      position: "Technical Advisor",
      image:
        "https://i.ibb.co/tHXVkkz/437755668-1795927287563835-7772826289373223882-n.jpg",
    },
  ];
  return (
    <div className="py-12 bg-slate-200">
      <section className="bg-white dark:bg-base-green">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-raleWay font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
            Meet The Authority Team of EduMate
          </h1>

          <p className="max-w-7xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
            we proudly introduce the visionary leaders behind EduMate. Our
            dedicated team of founders and key advisors ensures that EduMate
            remains at the forefront of online education. Get to know the
            individuals whose expertise, passion, and commitment drive our
            mission to provide exceptional educational experiences.
          </p>
          {/* <SectionHeader
            title={"Meet The Authority Team of EduMate"}
            description={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt ex placeat modi magni quia error alias, adipisci rem similique, at omnis eligendi optio eos harum."
            }
          ></SectionHeader> */}
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
            {authority.map((data, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-base-orange dark:border-gray-700 dark:hover:border-transparent hover:rotate-2 hover:scale-95 hover:transition-all hover:duration-500 hover:ease-out hover:delay-200"
              >
                <img
                  className="object-fit w-32 h-32 rounded-full ring-4 ring-gray-300"
                  src={data.image}
                  alt=""
                />

                <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-base-green">
                  {data.name}
                </h1>

                <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-base-green">
                  {data.position}
                </p>

                <div className="flex mt-3 -mx-2">
                  <a
                    className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-base-green"
                    aria-label="Reddit"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM6.807 10.543C6.20862 10.5433 5.67102 10.9088 5.45054 11.465C5.23006 12.0213 5.37133 12.6558 5.807 13.066C5.92217 13.1751 6.05463 13.2643 6.199 13.33C6.18644 13.4761 6.18644 13.6229 6.199 13.769C6.199 16.009 8.814 17.831 12.028 17.831C15.242 17.831 17.858 16.009 17.858 13.769C17.8696 13.6229 17.8696 13.4761 17.858 13.33C18.4649 13.0351 18.786 12.3585 18.6305 11.7019C18.475 11.0453 17.8847 10.5844 17.21 10.593H17.157C16.7988 10.6062 16.458 10.7512 16.2 11C15.0625 10.2265 13.7252 9.79927 12.35 9.77L13 6.65L15.138 7.1C15.1931 7.60706 15.621 7.99141 16.131 7.992C16.1674 7.99196 16.2038 7.98995 16.24 7.986C16.7702 7.93278 17.1655 7.47314 17.1389 6.94094C17.1122 6.40873 16.6729 5.991 16.14 5.991C16.1022 5.99191 16.0645 5.99491 16.027 6C15.71 6.03367 15.4281 6.21641 15.268 6.492L12.82 6C12.7983 5.99535 12.7762 5.993 12.754 5.993C12.6094 5.99472 12.4851 6.09583 12.454 6.237L11.706 9.71C10.3138 9.7297 8.95795 10.157 7.806 10.939C7.53601 10.6839 7.17843 10.5422 6.807 10.543ZM12.18 16.524C12.124 16.524 12.067 16.524 12.011 16.524C11.955 16.524 11.898 16.524 11.842 16.524C11.0121 16.5208 10.2054 16.2497 9.542 15.751C9.49626 15.6958 9.47445 15.6246 9.4814 15.5533C9.48834 15.482 9.52348 15.4163 9.579 15.371C9.62737 15.3318 9.68771 15.3102 9.75 15.31C9.81233 15.31 9.87275 15.3315 9.921 15.371C10.4816 15.7818 11.159 16.0022 11.854 16C11.9027 16 11.9513 16 12 16C12.059 16 12.119 16 12.178 16C12.864 16.0011 13.5329 15.7863 14.09 15.386C14.1427 15.3322 14.2147 15.302 14.29 15.302C14.3653 15.302 14.4373 15.3322 14.49 15.386C14.5985 15.4981 14.5962 15.6767 14.485 15.786V15.746C13.8213 16.2481 13.0123 16.5208 12.18 16.523V16.524ZM14.307 14.08H14.291L14.299 14.041C13.8591 14.011 13.4994 13.6789 13.4343 13.2429C13.3691 12.8068 13.6162 12.3842 14.028 12.2269C14.4399 12.0697 14.9058 12.2202 15.1478 12.5887C15.3899 12.9572 15.3429 13.4445 15.035 13.76C14.856 13.9554 14.6059 14.0707 14.341 14.08H14.306H14.307ZM9.67 14C9.11772 14 8.67 13.5523 8.67 13C8.67 12.4477 9.11772 12 9.67 12C10.2223 12 10.67 12.4477 10.67 13C10.67 13.5523 10.2223 14 9.67 14Z"></path>
                    </svg>
                  </a>

                  <a
                    className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-base-green"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.00195 12.002C2.00312 16.9214 5.58036 21.0657 10.405 21.8785V14.8965H7.89895V12.002H10.405V9.79797C10.405 7.29997 11.8979 5.90797 14.202 5.90797C15.3284 5.90797 16.504 6.106 16.504 6.106V8.537H15.306C14.127 8.537 13.596 9.28597 13.596 10.057V12.002H16.396L15.934 14.896H13.596V21.8785C18.4206 21.0657 21.9978 16.9214 21.999 12.002C21.999 6.47594 17.527 2.00195 12 2.00195C6.47394 2.00195 2 6.47594 2 12.002H2.00195Z"></path>
                    </svg>
                  </a>

                  <a
                    className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-base-green"
                    aria-label="Github"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.026 2C6.47795 1.99944 2.001 6.47593 2 12.024C2 16.549 5.128 20.243 9.335 21.489C9.838 21.578 10.025 21.276 10.025 21.014C10.025 20.779 10.017 20.184 10.013 19.386C7.04095 19.986 6.44495 17.969 6.44495 17.969C5.99995 16.846 5.33295 16.553 5.33295 16.553C4.42195 15.942 5.40395 15.956 5.40395 15.956C6.41295 16.031 6.92295 16.986 6.92295 16.986C7.81995 18.525 9.26195 18.034 9.83795 17.772C9.92495 17.114 10.197 16.697 10.497 16.428C7.896 16.153 5.21695 15.272 5.21695 11.449C5.21642 10.3514 5.63925 9.29992 6.38395 8.499C6.208 8.036 5.808 6.808 6.45395 5.149C6.45395 5.149 7.43795 4.865 9.99995 6.486C11.4119 6.09151 12.939 6.09151 14.351 6.486C16.913 4.865 17.897 5.149 17.897 5.149C18.543 6.808 18.142 8.036 17.966 8.499C18.7121 9.30031 19.1357 10.353 19.134 11.451C19.134 15.286 16.4509 16.152 13.845 16.422C14.243 16.741 14.606 17.372 14.606 18.346C14.606 19.724 14.596 20.75 14.596 21.01C14.596 21.275 14.783 21.581 15.294 21.488C19.502 20.241 22.63 16.547 22.63 12.024C22.63 6.47593 18.153 1.99944 12.606 2H12.026Z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Authority;
