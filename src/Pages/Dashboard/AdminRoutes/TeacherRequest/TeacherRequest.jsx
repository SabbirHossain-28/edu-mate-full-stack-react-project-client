import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";

const TeacherRequest = () => {
    const axiosCommon=useAxiosCommon();

    const {data:applications=[]}=useQuery({
        queryKey:["applications"],
        queryFn:async()=>{
            const res=await axiosCommon.get("/applications")
            return res.data
        }
    })
    console.log(applications);
    return (
        <div>
            <h2>This Teacher request page</h2>
        </div>
    );
};

export default TeacherRequest;