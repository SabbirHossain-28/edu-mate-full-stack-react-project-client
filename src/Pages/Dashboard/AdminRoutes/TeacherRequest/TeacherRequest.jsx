import { useMutation, useQuery } from "@tanstack/react-query";
// import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import Container from "../../../../Shared/Container/Container";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Shared/Loading/Loading";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: applications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });
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
      </Container>
    </div>
  );
};

export default TeacherRequest;
