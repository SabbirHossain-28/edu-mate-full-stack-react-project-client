import useAuth from "./useAuth"
import useAxiosCommon from "./useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const useRole=()=>{
    const {user,loading}=useAuth();
    const axiosCommon=useAxiosCommon();

    const {data:role,isLoading}=useQuery({
        queryKey:["role"],
        enabled: !loading && !!user?.email,
        queryFn:async()=>{
            const res= await axiosCommon.get(`/users/${user?.email}`)
            return res.data.role
        }
    })
    return [role,isLoading];
}

export default useRole;