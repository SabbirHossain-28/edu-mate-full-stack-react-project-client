import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";

const MyClass = () => {
    const {user}=useAuth();
    const axiosCommon=useAxiosCommon();

    const {data:requestedClasses=[],refetch}=useQuery({
        queryKey:["requestedClasses",user?.email],
        queryFn:async()=>{
            const res=await axiosCommon.get(`/classes/${user?.email}`);
            return res.data
        },
        enabled: !!user?.email,
    })
    console.log(requestedClasses);
    return (
        <div>
            <h2>My class page for teacher</h2>
        </div>
    );
};

export default MyClass;