import { useMutation, useQuery } from "@tanstack/react-query";
// import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Container from "../../../../Shared/Container/Container";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import { TbReport } from "react-icons/tb";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../../../../Shared/Loading/Loading";

const AllAddedClasses = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allClasses = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });

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
        </div>
      </Container>
    </div>
  );
};

export default AllAddedClasses;
