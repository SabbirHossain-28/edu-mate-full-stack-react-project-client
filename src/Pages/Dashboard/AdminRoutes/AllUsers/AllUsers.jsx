import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import Container from "../../../../Shared/Container/Container";
import { GrUserAdmin } from "react-icons/gr";

const AllUsers = () => {
  const axiosCommon = useAxiosCommon();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosCommon.get("/users");
      return res.data;
    },
  });
  console.log(users);
  return (
    <div className="bg-slate-200 min-h-screen my-auto">
      <Container>
        <div className="pt-16">
          <div className="overflow-x-auto bg-base-green border-2 border-black">
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
              <tbody className="text-gray-400">
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
                      <button className="btn bg-base-orange border-none btn-xs"><GrUserAdmin className="text-2xl"></GrUserAdmin></button>
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
