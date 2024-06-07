import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import Container from "../../../../Shared/Container/Container";
import { GrUserAdmin } from "react-icons/gr";
import Swal from "sweetalert2";
import Loading from "../../../../Shared/Loading/Loading";
import { useState } from "react";

const AllUsers = () => {
  const axiosCommon = useAxiosCommon();
  const [loadingUserId, setLoadingUserId] = useState(null);

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosCommon.get("/users");
      return res.data;
    },
  });
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosCommon.patch(`/users/admin/${id}`);
      return res.data;
    },
  });

  const handleUserRole = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingUserId(id);
        await mutateAsync(id, {
          onSuccess: (data) => {
            if (data.modifiedCount) {
              Swal.fire({
                title: "Success",
                text: "User has been made an admin successfully.",
                icon: "success",
              });
              refetch();
            }
            setLoadingUserId(null);
          },
          onError: (error) => {
            console.error("Error updating user role:", error);
            Swal.fire({
              title: "Error",
              text: "There was an error making the user an admin.",
              icon: "error",
            });
            setLoadingUserId(null);
          },
        });
      }
    });
  };
  console.log(users);
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading></Loading>
      </div>
    );
  return (
    <div className="bg-slate-200 min-h-screen my-auto">
      <Container>
        <div className="pt-16">
          <div className="overflow-x-auto bg-white border-2 border-black">
            <table className="table">
              <thead className="text-gray-500">
                <tr>
                  <th>User Image</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>User Role</th>
                  <th>Create Admin</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {users.map((data, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={data?.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{data?.name}</td>
                    <td>{data?.email}</td>
                    <td>{data?.role}</td>
                    <td>
                      <button
                        onClick={() => handleUserRole(data?._id)}
                        className={`btn ${
                          data?.role === "Admin"
                            ? "bg-gray-400"
                            : "bg-base-orange"
                        } border-none btn-sm`}
                        disabled={
                          data?.role === "Admin" || loadingUserId === data?._id
                        }
                      >
                        {loadingUserId === data?._id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <GrUserAdmin className="text-2xl text-white" />
                        )}
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

export default AllUsers;
