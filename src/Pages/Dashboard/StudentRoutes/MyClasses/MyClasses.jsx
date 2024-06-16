import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Container from "../../../../Shared/Container/Container";
import { Link } from "react-router-dom";
import { useState } from "react";

const MyClasses = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: enrolledClassData = [] } = useQuery({
    queryKey: ["enrolledClassData", user?.email,currentPage],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClass/${user?.email}?page=${currentPage}&size=${10}`);
      return res.data;
    },
  });

  const { data: count = 0 } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/countedEnrolledClass/${user?.email}`);
      return res.data.result;
    },
  });

  const numberOfPages = Math.ceil(count / 10);
  const pages = [
    ...Array(numberOfPages)
      .keys()
      .map((key) => key + 1),
  ];

  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  };


  return (
    <div>
      <Container>
        <div className="min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
            {enrolledClassData.map((data, idx) => (
              <div
                key={idx}
                className="max-w-2xl overflow-hidden bg-base-green rounded-lg shadow-md  hover:scale-95 hover:transition-all hover:ease-in hover:duration-200"
              >
                <img
                  className="object-fit w-full h-64"
                  src={data?.classImage}
                  alt="Article"
                />

                <div className="p-6">
                  <div className="h-24">
                    {/* <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                      Product
                    </span> */}
                    <a
                      className="block mt-2 text-xl font-semibold text-gray-400 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                      tabIndex="0"
                      role="link"
                    >
                      {data?.classTitle}
                    </a>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          className="object-cover h-10 w-10 rounded-full"
                          src={data?.teacherImage}
                          alt="Avatar"
                        />
                        <a
                          className="mx-2 font-semibold text-gray-400 dark:text-gray-200"
                          tabIndex="0"
                          role="link"
                        >
                          {data?.teacherName}
                        </a>
                      </div>
                      <div>
                        <Link to={`/dashboard/enrollClassDetails/${data?._id}`}>
                          <button className="text-base-green bg-base-orange p-1 font-poppin font-semibold rounded-lg hover:scale-95 hover:text-white hover:transition-all hover:ease-in hover:duration-300">
                            Continue
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ol className="flex justify-center gap-1 text-xs font-medium mt-4">
            <li>
              <button
                disabled={currentPage === 1}
                onClick={() => handleCurrentPage(currentPage - 1)}
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>

            <li className="flex gap-2">
              {pages.map((page, idx) => (
                <button
                  onClick={() => handleCurrentPage(page)}
                  key={idx}
                  className={`${
                    currentPage === page
                      ? "bg-base-orange text-black dark:text-white border-2 border-black"
                      : "bg-white text-gray-900 dark:text-white"
                  }block size-8 rounded   text-center leading-8 `}
                >
                  {page}
                </button>
              ))}
            </li>

            <li>
              <button
                disabled={currentPage === numberOfPages}
                onClick={() => handleCurrentPage(currentPage + 1)}
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ol>
        </div>
      </Container>
    </div>
  );
};

export default MyClasses;
