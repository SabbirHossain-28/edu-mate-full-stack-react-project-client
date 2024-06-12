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

const MyClassDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  //   const [loading, setLoading] = useState(false);

  const { data: submittedAssignmentData = [] } = useQuery({
    queryKey: ["submittedAssignmentData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submittedAssignment/${user?.email}`);
      return res.data;
    },
  });

  console.log(submittedAssignmentData);

  const { data: classData = {}, isLoading: loadingId } = useQuery({
    queryKey: ["classId", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClassAssignment/${id}`);
      return res.data;
    },
  });
  const { data: allAssignments = [] } = useQuery({
    queryKey: ["allAssignments"],
    enabled: !loadingId && !!classData?.classId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${classData?.classId}`);
      return res.data;
    },
  });

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
          {allAssignments.length === 0 ? (
            <p className="text-3xl font-semibold font-raleWay text-center text-base-orange">
              Currently no assignment is available for this class. We will
              inform you as soon as possible,when assignment will provided/added
              for this class.Keep learning and keep exploring...{" "}
            </p>
          ) : (
            <div className="overflow-x-auto bg-white border-2 border-black">
              <table className="table">
                <thead className="text-gray-500">
                  <tr>
                    <th>Assignment Title</th>
                    <th>Description</th>
                    <th>Deadline</th>
                    <th>Submit</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
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
                            <IoMdDoneAll className="text-lg"></IoMdDoneAll>Submitted
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
        </div>
      </Container>
    </div>
  );
};

export default MyClassDetails;
