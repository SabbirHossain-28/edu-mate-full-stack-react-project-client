import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import Container from "../../../../Shared/Container/Container";
import { LuClipboardEdit } from "react-icons/lu";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import Swal from "sweetalert2";

const MyClass = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();

  const { data: requestedClasses = [], refetch } = useQuery({
    queryKey: ["requestedClasses", user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/classes/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { mutateAsync: mutateDelete } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosCommon.delete(`/classes/${id}`);
      return res.data;
    },
  });

  const handleClassDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "Your added class will be delete permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateDelete(id, {
          onSuccess: (data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your class has been deleted.",
                icon: "success",
              });
              refetch();
            }
          },
          onError: (error) => {
            console.error("Error deleting class", error);
            Swal.fire(
              "Error",
              "There was an error deleting your added class",
              "error"
            );
          },
        });
      }
    });
  };

  if (requestedClasses.length === 0) {
    return (
      <div className="bg-slate-200 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-pop font-bold mb-4">
            Opppsss!!!!....There is no added class data for you!
          </h2>
          <p className="text-xl font-poppin">
            You are not add any single class and for that you have no data in my
            class page..Please add class as soon as possible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-200 min-h-screen my-auto">
      <Container>
        <div className="pt-16">
          <div className="overflow-x-auto bg-white border-2 border-black">
            <table className="table">
              <thead className="text-gray-500">
                <tr>
                  <th>Teacher Image</th>
                  <th>Teacher Name</th>
                  <th>Teacher Email</th>
                  <th>Class image</th>
                  <th>Class Title</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>Delete</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {requestedClasses.map((data, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={data?.teacherImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{data?.teacherName}</td>
                    <td>{data?.teacherEmail}</td>
                    <td>{data?.classTitle}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={data?.classImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{data?.price}</td>
                    <td>
                      {data?.classDescription.split("").slice(0, 40)}.......
                    </td>
                    <td>{data?.status}</td>
                    <td>
                      <button className="btn">
                        <LuClipboardEdit className="text-xl"></LuClipboardEdit>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleClassDelete(data?._id)}
                        className="btn"
                      >
                        <RiDeleteBin2Line className="text-xl"></RiDeleteBin2Line>
                      </button>
                    </td>
                    <td>
                      <button className="btn">
                        <TbListDetails className="text-xl"></TbListDetails>
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

export default MyClass;
