import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import Container from "../../../../Shared/Container/Container";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import { TbReport } from "react-icons/tb";

const AllAddedClasses = () => {
    const axiosCommon =useAxiosCommon();

    const {data:allClasses=[]}=useQuery({
        queryKey:["allClasses"],
        queryFn:async ()=>{
            const res=await axiosCommon.get("/classes");
            return res.data;
        }
    })
    console.log(allClasses);
    return (
        <div className="bg-slate-200 min-h-screen my-auto">
      <Container>
        <div className="pt-16">
          <div className="overflow-x-auto bg-white border-2 border-black">
            <table className="table">
              <thead className="text-gray-500">
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
              <tbody className="text-gray-600">
                {allClasses.map((data, idx) => (
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
                    <td>{data?.classTitle}</td>
                    <td>{data?.teacherName}</td>
                    <td>{data?.teacherEmail}</td>
                    <td>{data?.classDescription.split("").slice(0,20)}....</td>
                    <td>{data?.status}</td>
                    <td>
                    <button
                    //   disabled={data?.status==="Approved" || data?.status==="Rejected"}
                        // onClick={() =>
                        //   handleApproved(data?._id, data?.userName)
                        // }
                        className="btn btn-sm"
                      >
                        <FcApprove className="text-2xl"></FcApprove>
                      </button>
                    </td>
                    <td>
                    <button
                    //   disabled={data?.status==="Approved" || data?.status==="Rejected"}
                        // onClick={() =>
                        //   handleRejected(data?._id, data?.userName)
                        // }
                        className="btn btn-sm"
                      >
                        <FcDisapprove className="text-2xl"></FcDisapprove>
                      </button>
                    </td>
                    <td>
                        <button className="btn btn-sm">
                            <TbReport className="text-2xl"></TbReport>
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

export default AllAddedClasses;