import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import Container from "../../../../Shared/Container/Container";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import Swal from "sweetalert2";

const TeacherRequest = () => {
  const axiosCommon = useAxiosCommon();

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosCommon.get("/applications");
      return res.data;
    },
  });
  const { mutateAsync: approveMutate } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosCommon.patch(`/applications/approve/${id}`);
      return res.data;
    },
  });

  const { mutateAsync: rejectMutate } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosCommon.patch(`/applications/reject/${id}`);
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
      confirmButtonColor: "#3085d6",
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
      confirmButtonColor: "#3085d6",
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
            });
          },
        });
      }
    });
  };
  console.log(applications);
  return (
    <div className="bg-slate-200 min-h-screen my-auto">
      <Container>
        <div className="pt-16">
          <div className="overflow-x-auto bg-white border-2 border-black">
            <table className="table">
              <thead className="text-gray-500">
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
              <tbody className="text-gray-600">
                {applications.map((data, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={data?.userProfileImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{data?.userName}</td>
                    <td>{data?.experience}</td>
                    <td>{data?.title}</td>
                    <td>{data?.category}</td>
                    <td>{data?.status}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleApproved(data?._id, data?.userName)
                        }
                        className="btn btn-sm"
                      >
                        <FcApprove className="text-2xl"></FcApprove>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleRejected(data?._id, data?.userName)
                        }
                        className="btn btn-sm"
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
