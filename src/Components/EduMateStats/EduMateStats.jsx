import { useQuery } from "@tanstack/react-query";
import statImage from "../../assets/images/statSectionImg/edumateStat.jpg";
import { FaUsersRectangle, FaDiagramSuccessor } from "react-icons/fa6";
import { MdSchool } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const EduMateStats = () => {
    const axiosSecure=useAxiosSecure();
    const {data:statsData={},isLoading}=useQuery({
        queryKey:["statsData"],
        queryFn:async()=>{
            const res=await axiosSecure.get("/stats");
            return res.data;
        }
    })
    console.log(statsData);
  return (
    <div className="bg-base-green">
      <section>
        <div className="pt-12">
          <h1 className="text-2xl font-raleWay font-semibold text-center text-gray-300 capitalize lg:text-4xl dark:text-white">
            Here Is Our Platform Insights
          </h1>

          <p className="max-w-7xl text-base mx-auto my-6 text-center text-gray-400 dark:text-gray-300 font-poppin">
          Discover the heartbeat of our platform! This section showcases vital statistics: the total number of registered users, the number of available classes, and the total student enrollments. On the left, these key metrics are presented in a sleek card format, providing a quick and clear overview.
          </p>
        </div>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden  sm:h-80 lg:order-last lg:h-full">
              <img
                alt=""
                src={statImage}
                className="absolute inset-0 h-full  w-full object-fit  rounded-t-3xl"
              />
            </div>

            <div className="">
              <div className=" rounded-xl border  border-gray-600 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 flex justify-center items-center gap-2 mb-2">
                <FaUsersRectangle className="text-base-orange text-4xl"></FaUsersRectangle>

                <div className="flex flex-col items-center">
                  <h2 className="mt-1 text-xl font-bold text-white">
                    Total Memebers In EduMate
                  </h2>
                  <p className="text-xl font-bold text-white font-poppin">{isLoading?<span>Loading...</span>: statsData?.totalUsers}</p>
                </div>
              </div>

              <div className="rounded-xl border bg-base-green border-gray-600 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 flex justify-center items-center gap-2 mb-2">
                <MdSchool className="text-base-orange text-5xl"></MdSchool>

                <div className="flex flex-col items-center">
                  <h2 className="mt-1 text-xl font-bold text-white">
                    Total Classes In EduMate
                  </h2>
                  <p className="text-xl font-bold text-white font-poppin">{isLoading?<span>Loading...</span>:statsData?.totalClasses}</p>
                </div>
              </div>
              <div className="rounded-xl  border bg-base-green border-gray-600 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 flex justify-center items-center gap-2">
                <FaDiagramSuccessor className="text-base-orange text-4xl"></FaDiagramSuccessor>

                <div className="flex flex-col items-center">
                  <h2 className="mt-1 text-xl font-bold text-white">
                    Total Class Enrollment
                  </h2>
                  <p className="text-xl font-bold text-white font-poppin">{isLoading?<span>Loading...</span>:statsData?.totalEnrollments}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EduMateStats;
