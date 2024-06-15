import { useMutation, useQuery } from "@tanstack/react-query";
// import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import Container from "../../../../Shared/Container/Container";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Shared/Loading/Loading";
import { useState } from "react";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: applications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["applications",currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?page=${currentPage}&size=${5}`);
      return res.data;
    },
  });

  const {data:count=0}=useQuery({
    queryKey:["count"],
    queryFn:async()=>{
      const res=await axiosSecure.get("/countedApplications");
      return res.data.result;
    }
  })

  const numberOfPages = Math.ceil(count / 5);
  const pages = [
    ...Array(numberOfPages)
      .keys()
      .map((key) => key + 1),
  ];

  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  };


  const { mutateAsync: approveMutate } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/applications/approve/${id}`);
      return res.data;
    },
  });

  const { mutateAsync: rejectMutate } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/applications/reject/${id}`);
      return res.data;
    },
  });

  const handleApproved = (id, userName) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to accept this user teacher request",
      icon: "warning",
      showCancelButton: true,
      background: "#07332F",
      color: "#F2871D",
      confirmButtonColor: "#F2871D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await approveMutate(id, {
          onSuccess: (data) => {
            if (data?.modifiedCount) {
              Swal.fire({
                title: "Update Successfull",
                text: `Teacher request of ${userName} approved successfully.`,
                icon: "success",
                background: "#07332F",
                color: "#F2871D",
              });
              refetch();
            }
          },
          onError: (error) => {
            console.error("Error updating teacher request:", error);
            Swal.fire({
              title: "Error",
              text: "There was an error approving the request",
              icon: "error",
              background: "#07332F",
              color: "#F2871D",
            });
          },
        });
      }
    });
  };
  const handleRejected = (id, userName) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want reject this user teacher request",
      icon: "warning",
      showCancelButton: true,
      background: "#07332F",
      color: "#F2871D",
      confirmButtonColor: "#F2871D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await rejectMutate(id, {
          onSuccess: (data) => {
            if (data?.modifiedCount) {
              Swal.fire({
                title: "Update Successfull",
                text: `Teacher request of ${userName} rejected successfully.`,
                icon: "success",
                background: "#07332F",
                color: "#F2871D",
              });
              refetch();
            }
          },
          onError: (error) => {
            console.error("Error updating teacher request:", error);
            Swal.fire({
              title: "Error",
              text: "There was an error rejecting the request",
              icon: "error",
              background: "#07332F",
              color: "#F2871D",
            });
          },
        });
      }
    });
  };

  if (isLoading) {
    <div className="flex justify-center items-center">
      <Loading></Loading>
    </div>;
  }
  if (applications.length === 0) {
    return;
  }
  return (
    <div className="bg-slate-200 min-h-screen my-auto">
      <Container>
        <div className="pt-16">
          <div className="overflow-x-auto bg-base-green border-2 border-black p-2">
            <table className="table">
              <thead className="text-gray-300">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Experience</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Approved</th>
                  <th>Rejected</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                {applications.length === 0 && (
                  <tr className="text-2xl font-semibold font-raleWay text-base-orange">
                    Sorry Currently You Have No Teacher Request On This Page
                  </tr>
                )}
                {applications.map((data, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className={`avatar border-4 rounded-2xl ${
                            data?.status === "Approved" && "border-green-500"
                          } ${
                            data?.status === "Rejected" && "border-red-500"
                          } ${
                            data?.status === "Pending" && "border-orange-500"
                          }`}
                        >
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={data?.userProfileImage}
                              alt="Teacher Image"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{data?.userName}</td>
                    <td>{data?.experience}</td>
                    <td>{data?.title}</td>
                    <td>{data?.category}</td>
                    <td
                      className={`font-semibold ${
                        data?.status === "Approved" && "text-green-500"
                      } ${data?.status === "Rejected" && "text-red-500"} ${
                        data?.status === "Pending" && "text-orange-500-500"
                      }`}
                    >
                      {data?.status}
                    </td>
                    <td>
                      <button
                        disabled={
                          data?.status === "Approved" ||
                          data?.status === "Rejected"
                        }
                        onClick={() =>
                          handleApproved(data?._id, data?.userName)
                        }
                        className={`bg-base-orange p-1 rounded-lg ${
                          data?.status === "Approved" && "bg-green-500"
                        }`}
                      >
                        <FcApprove className="text-2xl"></FcApprove>
                      </button>
                    </td>
                    <td>
                      <button
                        disabled={
                          data?.status === "Approved" ||
                          data?.status === "Rejected"
                        }
                        onClick={() =>
                          handleRejected(data?._id, data?.userName)
                        }
                        className={`bg-base-orange p-1 rounded-lg ${
                          data?.status === "Rejected" && "bg-red-500"
                        }`}
                      >
                        <FcDisapprove className="text-2xl"></FcDisapprove>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
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

export default TeacherRequest;
