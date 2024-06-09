import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import Container from "../../../../Shared/Container/Container";
import { LuClipboardEdit } from "react-icons/lu";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";

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
  console.log(requestedClasses);
  return (
    <div className="bg-slate-200 min-h-screen my-auto">
      <Container>
        <div className="pt-16">
          <div className="overflow-x-auto bg-white border-2 border-black">
            <table className="table">
              <thead className="text-gray-500">
                <tr>
                  <th>Course Image</th>
                  <th>Teacher Name</th>
                  <th>Teacher Email</th>
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
                              src={data?.classImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{data?.teacherName}</td>
                    <td>{data?.teacherEmail}</td>
                    <td>{data?.classTitle}</td>
                    <td>{data?.price}</td>
                    <td>{data?.classDescription}</td>
                    <td>{data?.status}</td>
                    <td>
                      <button className="btn">
                        <LuClipboardEdit></LuClipboardEdit>
                      </button>
                    </td>
                    <td>
                      <button className="btn">
                        <RiDeleteBin2Line></RiDeleteBin2Line>
                      </button>
                    </td>
                    <td>
                      <button className="btn">
                        <TbListDetails></TbListDetails>
                      </button>
                    </td>
                    {/* <td>
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
                    </td> */}
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
