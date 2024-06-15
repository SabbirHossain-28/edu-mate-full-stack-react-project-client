import { useMutation, useQuery } from "@tanstack/react-query";
// import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Container from "../../../../Shared/Container/Container";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import { TbReport } from "react-icons/tb";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../../../../Shared/Loading/Loading";
import { useState } from "react";

const AllAddedClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: allClasses = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allClasses",currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes?page=${currentPage}&size=${10}`);
      return res.data;
    },
  });

  const {data:count=0}=useQuery({
    queryKey:["count"],
    queryFn:async()=>{
      const res=await axiosSecure.get("/countedClass");
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

  const { mutateAsync: mutateApproveClass } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/classes/approve/${id}`);
      return res.data;
    },
  });

  const handleClassApproved = (id, classTitle) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you want accepted the ${classTitle} class`,
      icon: "warning",
      showCancelButton: true,
      background: "#07332F",
      color: "#F2871D",
      confirmButtonColor: "#F2871D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateApproveClass(id, {
          onSuccess: (data) => {
            if (data.modifiedCount) {
              Swal.fire({
                title: "Class Accepted",
                text: `${classTitle} class is accepted successfully.`,
                icon: "success",
                background: "#07332F",
                color: "#F2871D",
              });
              refetch();
            }
          },
          onError: (error) => {
            console.log("Error approving class", error);
            Swal.fire({
              title: "Error",
              text: "There was an error approving the class",
              icon: "error",
              background: "#07332F",
              color: "#F2871D",
            });
          },
        });
      }
    });
  };

  const { mutateAsync: mutateRejectClass } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/classes/reject/${id}`);
      return res.data;
    },
  });

  const handleClassReject = (id, classTitle) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you want reject the ${classTitle} class`,
      icon: "warning",
      showCancelButton: true,
      background: "#07332F",
      color: "#F2871D",
      confirmButtonColor: "#F2871D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateRejectClass(id, {
          onSuccess: (data) => {
            if (data.modifiedCount) {
              Swal.fire({
                title: "Rejected Successfully",
                text: `${classTitle} class is rejected successfully.`,
                icon: "success",
                background: "#07332F",
                color: "#F2871D",
              });
              refetch();
            }
          },
          onError: (error) => {
            console.log("Error rejecting class", error);
            Swal.fire({
              title: "Error",
              text: "There was an error rejecting the class",
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading></Loading>
      </div>
    );
  }
  return (
    <div className="bg-slate-200 min-h-screen my-auto">
      <Container>
        <div className="pt-16">
          <div className="overflow-x-auto p-2 border-2 border-black bg-base-green">
            <table className="table">
              <thead className="text-gray-300">
                <tr>
                  <th>Class Image</th>
                  <th>Class Title</th>
                  <th>Teacher Name</th>
                  <th>Teacher Email</th>
                  <th>Class Description</th>
                  <th>Status</th>
                  <th>Approve</th>
                  <th>Reject</th>
                  <th>Class Progress</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                {allClasses.map((data, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className={`avatar border-4 rounded-2xl ${
                            data?.status === "Pending" && "border-orange-500"
                          } ${
                            data?.status === "Accepted" && "border-green-500"
                          } ${data?.status === "Rejected" && "border-red-500"}`}
                        >
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={data?.classImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{data?.classTitle}</td>
                    <td>{data?.teacherName}</td>
                    <td>{data?.teacherEmail}</td>
                    <td>{data?.classDescription.split("").slice(0, 20)}....</td>
                    <td
                      className={`font-semibold ${
                        data?.status === "Pending" && "text-orange-500"
                      } ${data?.status === "Accepted" && "text-green-500"} ${
                        data?.status === "Rejected" && "text-red-500"
                      }`}
                    >
                      {data?.status}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleClassApproved(data?._id, data?.classTitle)
                        }
                        className={`p-2 bg-base-orange rounded-lg ${
                          data?.status === "Accepted" && "bg-green-500"
                        }`}
                      >
                        <FcApprove className="text-2xl"></FcApprove>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleClassReject(data?._id, data?.classTitle)
                        }
                        className={`p-2 bg-base-orange rounded-lg ${
                          data?.status === "Rejected" && "bg-red-500"
                        }`}
                      >
                        <FcDisapprove className="text-2xl"></FcDisapprove>
                      </button>
                    </td>
                    <td>
                      <Link to={`/dashboard/addedClassProgress/${data?._id}`}>
                        <button
                          disabled={
                            data?.status === "Pending" ||
                            data?.status === "Rejected"
                          }
                          className={`p-2  rounded-lg ${
                            data?.status === "Accepted" && "bg-green-500"
                          } ${data?.status === "Rejected" && "bg-red-500"} ${
                            data?.status === "Pending" && "bg-blue-500"
                          }`}
                        >
                          <TbReport className="text-2xl text-white"></TbReport>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default AllAddedClasses;
