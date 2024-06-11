import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTeacher = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();

    const {data:isTeacher,isPending:isTeacherLoading}=useQuery({
        queryKey:["isTeacher",user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/user/teacher/${user?.email}`);
            return res.data.Teacher;
        }
    })
    return [isTeacher,isTeacherLoading]
};

export default useTeacher;