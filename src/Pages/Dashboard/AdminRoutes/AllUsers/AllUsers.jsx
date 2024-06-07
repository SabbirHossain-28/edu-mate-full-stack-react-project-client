import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";

const AllUsers = () => {
    const axiosCommon=useAxiosCommon();

    const {data:users=[]}=useQuery({
        queryKey:["users"],
        queryFn:async()=>{
            const res=await axiosCommon.get("/users");
            return res.data
        }
    })
    console.log(users);
    return (
        <div>
            <h2>All users page</h2>
        </div>
    );
};

export default AllUsers;