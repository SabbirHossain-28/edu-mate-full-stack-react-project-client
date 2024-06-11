import useAuth from "./useAuth"
// import useAxiosCommon from "./useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole=()=>{
    const {user,loading}=useAuth();
    // const axiosCommon=useAxiosCommon();
    const axiosSecure=useAxiosSecure();

    const {data:role="",isLoading}=useQuery({
        queryKey:["role",user?.email],
        enabled: !loading && !!user?.email,
        queryFn:async()=>{
            const res= await axiosSecure.get(`/users/${user?.email}`)
            return res.data.role
        }
    })
    return [role,isLoading];
}

export default useRole;