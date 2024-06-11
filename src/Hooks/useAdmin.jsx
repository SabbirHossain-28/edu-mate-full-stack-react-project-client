import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"
import useAxiosCommon from "./useAxiosSecure";
const useAdmin = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosCommon();

    const {data:isAdmin,isPending:isAdminLoading}=useQuery({
        queryKey:["isAdmin",user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data?.Admin
        }
    })
    return[isAdmin,isAdminLoading]
};

export default useAdmin;