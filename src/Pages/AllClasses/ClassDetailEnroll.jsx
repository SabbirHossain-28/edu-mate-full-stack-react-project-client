import { useParams } from "react-router-dom";
// import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import Container from "../../Shared/Container/Container";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PaymentModal from "../../Components/DashboardComponent/Modal/PaymentModal";
import { useState } from "react";
import useRole from "../../Hooks/useRole";
import Swal from "sweetalert2";

const ClassDetailEnroll = () => {
  // const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const [role] = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: classDataForEnroll = {},refetch } = useQuery({
    queryKey: ["classDataForEnroll", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${id}`);
      return res.data;
    },
  });
  const handleModalOpen = () => {
    if (role === "Teacher" || role === "Admin") {
      return Swal.fire({
        icon: "error",
        title: "Enroll Restricted",
        text: `Sorry!!${user?.displayName}.Teacher or Admin can not enroll any class`,
      });
    }
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Container>
        <div>
          <div className="mb-8 text-center">
            <h2 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 font-poppin font-bold">
              Wellcome! &#39;{user?.displayName}&#39; in{" "}
              {classDataForEnroll?.classTitle} course
            </h2>
            {/* <p className="font-poppin text-white mt-3">
                  Here, you will find all the essential details about the class,
                  including a comprehensive overview of the course content, the
                  instructor&#39;s background and expertise, and any other relevant
                  information you need before enrolling. We are thrilled to have
                  you on board and are confident that this course will help you
                  develop the skills needed to excel in graphic design. Review
                  the information below, and when you&#39;re ready, click &bdquo;Enroll
                  Now&bdquo; to start your creative journey with us.
                </p> */}
          </div>
          <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
              <div className="lg:flex lg:-mx-6">
                <div className="lg:w-3/4 lg:px-6">
                  <img
                    className="object-cover object-center w-full h-80 xl:h-[28rem] rounded-xl"
                    src={classDataForEnroll?.classImage}
                    alt=""
                  />

                  <div>
                    <p className="mt-6 text-sm text-white">
                      {classDataForEnroll?.classDescription}
                    </p>

                    <h1 className="max-w-lg mt-4 text-2xl font-semibold leading-tight text-gray-800 dark:text-white">
                      Teacher Information
                    </h1>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center mt-6">
                        <img
                          className="object-cover object-center w-16 h-16 rounded-full"
                          src={classDataForEnroll?.teacherImage}
                          alt="Teacher Image"
                        />

                        <div className="mx-4">
                          <h1 className="text-sm text-gray-700 dark:text-gray-200">
                            {classDataForEnroll?.teacherName}
                          </h1>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {classDataForEnroll?.teacherEmail}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={handleModalOpen}
                          className="border text-lg font-bold font-poppin px-3 py-2 mt-4 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-base-green border-none hover:scale-95 transition-all ease-in duration-200 hover:text-white"
                        >
                          Enroll This Class
                        </button>
                        {isModalOpen && (
                          <PaymentModal
                            handleModalClose={handleModalClose}
                            classDataForEnroll={classDataForEnroll}
                            refetch={refetch}
                          ></PaymentModal>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 lg:w-1/4 lg:mt-0 lg:px-6">
                  <div>
                    <h3 className="text-blue-500 capitalize">
                      Title of the class
                    </h3>

                    <a className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400">
                      {classDataForEnroll?.classTitle}
                    </a>
                  </div>

                  <hr className="my-6 border-gray-200 dark:border-gray-700" />

                  <div>
                    <h3 className="text-blue-500 capitalize">
                      Total Enrollment
                    </h3>

                    <a className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400">
                      {classDataForEnroll?.totalEnrollment}/Students
                    </a>
                  </div>

                  <hr className="my-6 border-gray-200 dark:border-gray-700" />

                  <div>
                    <h3 className="text-blue-500 capitalize">
                      Total Assignment
                    </h3>

                    <a className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400">
                      {classDataForEnroll?.assignment === 0
                        ? "Teacher not added any assignment yet"
                        : classDataForEnroll?.assignment}
                    </a>
                  </div>

                  <hr className="my-6 border-gray-200 dark:border-gray-700" />

                  <div>
                    <h3 className="text-blue-500 capitalize">
                      Price of this class
                    </h3>

                    <a className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400">
                      {classDataForEnroll?.price} $
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default ClassDetailEnroll;
