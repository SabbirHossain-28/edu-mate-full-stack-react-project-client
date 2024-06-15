import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Container from "../../../Shared/Container/Container";
import { AiOutlineFileDone } from "react-icons/ai";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
// import { useState } from "react";
import Loading from "../../../Shared/Loading/Loading";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import { IoMdDoneAll } from "react-icons/io";
import { FaRegHandPointLeft } from "react-icons/fa6";
import TERModal from "../../../Components/DashboardComponent/Modal/TERModal";
import { useForm } from "react-hook-form";
import { useState } from "react";

const MyClassDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: submittedAssignmentData = [],refetch } = useQuery({
    queryKey: ["submittedAssignmentData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submittedAssignment/${user?.email}`);
      return res.data;
    },
  });

  const { data: classData = {}, isLoading: loadingId } = useQuery({
    queryKey: ["classData", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClassAssignment/${id}`);
      return res.data;
    },
  });
  const { data: allAssignments = [] } = useQuery({
    queryKey: ["allAssignments",currentPage],
    enabled: !loadingId && !!classData?.classId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${classData?.classId}?page=${currentPage}&size=${10}`);
      return res.data;
    },
  });

  const {data:count=0}=useQuery({
    queryKey:["count",classData?.classId],
    enabled: !loadingId && !!classData?.classId,
    queryFn:async()=>{
      const res=await axiosSecure.get(`/countedAssignments/${classData?.classId}`);
      return res.data.result;
    }
  })

  const numberOfPages = Math.ceil(count / 10);
  const pages = [
    ...Array(numberOfPages)
      .keys()
      .map((key) => key + 1),
  ];

  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  };

  const { mutateAsync: mutateSubmit } = useMutation({
    mutationFn: async (submittedData) => {
      const res = await axiosSecure.post("/submittedAssignment", submittedData);
      return res.data;
    },
  });

  const handleSubmitAssignment = async (data) => {
    // setLoading(true);
    const submittedData = {
      assignmentId: data?._id,
      assignmentTitle: data?.assignmentTitle,
      assignmentDescription: data?.assignmentDescription,
      classId: data?.classId,
      studentEmail: user?.email,
      studentName: user?.displayName,
    };
    await mutateSubmit(submittedData, {
      onSuccess: (data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Successfully Submitted!",
            text: `${data?.assignmentTitle} class has been submitted.`,
            icon: "success",
          });
          refetch();
          //   setLoading(false);
        }
      },
      onError: (error) => {
        console.error("Error submitting assignment", error);
        Swal.fire(
          "Error",
          "There was an error submitting your assignment",
          "error"
        );
      },
    });
  };

  const { mutateAsync: mutateFeedback } = useMutation({
    mutationFn: async (userFeedback) => {
      const res = await axiosSecure.post("/feedbacks", userFeedback);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const userFeedback = {
      feedback: data?.feedback,
      rating: userRating,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
      classId: classData?.classId,
      classTitle: classData?.classTitle,
    };
    await mutateFeedback(userFeedback, {
      onSuccess: (data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Successfully Submitted feedback!",
            text: "Your valuable feedback is submitted successfully",
            icon: "success",
            background: "#07332F",
            color: "#F2871D",
          });
          setLoading(false);
          setUserRating(0);
          handleModalClose();
        }
      },
      onError: (error) => {
        console.error("Error submitting feedback", error);
        Swal.fire(
          "Error",
          "There was an error submitting your feedback",
          "error"
        );
      },
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (loadingId) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading></Loading>
      </div>
    );
  }
  return (
    <div className="bg-slate-200 min-h-screen my-auto">
      <Container>
        <div className="pt-16">
          <div className="mb-4">
            <SectionHeader
              title={`Assignment of ${classData?.classTitle} Class`}
              description={
                "Submit this assignment before the deadline is over..Please ensure that your submissions adhere to the given guidelines and deadlines. Remember to include all necessary files and information to avoid any delays in grading. We look forward to seeing your creative work and wish you the best of luck! "
              }
            ></SectionHeader>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={handleModalOpen}
              className="text-xl font-pop p-2 border-2 border-base-green bg-base-orange rounded-xl hover:scale-95 hover:transition-all hover:duration-300 hover:ease-in hover:bg-base-green hover:text-white hover:border-base-orange"
            >
              Teaching Evaluation Report
            </button>
            <FaRegHandPointLeft className="text-3xl text-base-orange"></FaRegHandPointLeft>
          </div>
          {allAssignments.length === 0 ? (
            <p className="text-3xl font-semibold font-raleWay text-center text-base-orange">
              Currently no assignment is available for this class. We will
              inform you as soon as possible,when assignment will provided/added
              for this class.Keep learning and keep exploring...{" "}
            </p>
          ) : (
            <div className="overflow-x-auto bg-base-green p-2 border-2 border-black">
              <table className="table">
                <thead className="text-gray-300">
                  <tr>
                    <th>Assignment Title</th>
                    <th>Description</th>
                    <th>Deadline</th>
                    <th>Submit</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  {allAssignments.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data?.assignmentTitle}</td>
                      <td>{data?.assignmentDescription}</td>
                      <td>{data?.assignmentDeadline}</td>
                      <td>
                        {submittedAssignmentData.find(
                          (submittedData) =>
                            submittedData?.assignmentId === data?._id
                        ) ? (
                          <p className="flex items-center font-semibold">
                            <IoMdDoneAll className="text-lg"></IoMdDoneAll>
                            Submitted
                          </p>
                        ) : (
                          <button
                            onClick={() => handleSubmitAssignment(data)}
                            className="btn btn-sm"
                          >
                            <AiOutlineFileDone className="text-xl"></AiOutlineFileDone>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
        {isModalOpen && (
          <TERModal
            handleModalClose={handleModalClose}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            loading={loading}
            reset={reset}
            setUserRating={setUserRating}
            userRating={userRating}
          ></TERModal>
        )}
      </Container>
    </div>
  );
};

export default MyClassDetails;
