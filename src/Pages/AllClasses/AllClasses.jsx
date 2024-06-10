import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import Container from "../../Shared/Container/Container";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import { Link } from "react-router-dom";

const AllClasses = () => {
  const axiosCommon = useAxiosCommon();

  const { data: acceptedClass = [] } = useQuery({
    queryKey: ["acceptedClass"],
    queryFn: async () => {
      const res = await axiosCommon.get("/allclasses/accepted");
      return res.data;
    },
  });
  console.log(acceptedClass);
  return (
    <div>
      <Container>
        <div className="min-h-screen">
          <SectionHeader
            title={"Explore Our Available Classes"}
            description={
              "Welcome to our class catalog! Here, you can find a wide variety of classes offered by our experienced teachers. All courses listed here have been carefully reviewed and approved by our admin team to ensure quality and relevance. Whether you're looking to advance your skills, explore new hobbies, or further your education, we have something for everyone. Browse through our offerings and start your learning journey today"
            }
          ></SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {acceptedClass.map((classData, idx) => (
              <a
                key={idx}
                className="group relative block h-64 sm:h-80 lg:h-96"
              >
                <span className="absolute inset-0 border-2 border-dashed border-black rounded-lg"></span>

                <div className="relative flex h-full transform items-end border-2 border-black bg-base-green rounded-lg transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                  <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
                    <img
                      className="w-full h-64 object-cover rounded-lg"
                      src={classData.classImage}
                      alt=""
                    />

                    <div className="h-12 text-center">
                      <h2 className="mt-4 text-xl text-base-orange font-medium sm:text-2xl">
                        {classData?.classTitle}
                      </h2>
                    </div>
                  </div>

                  <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8 text-base-orange font-poppin">
                    <img
                      className="w-24 h-24 rounded-xl"
                      src={classData?.teacherImage}
                      alt=""
                    />
                    <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                      Teacher Name:{classData?.teacherName}
                    </h3>
                    <h3 className="mt-4 text-xl font-medium sm:text-2xl">
                      Total Enrollment:{classData?.totalEnrollment}
                    </h3>
                    <p className="mt-4 text-lg sm:text-base">
                      {classData?.classDescription.split("").slice(0, 70)}...
                    </p>

                    <Link>
                      <button className="border text-lg font-bold px-3 py-1 mt-4 rounded-lg bg-base-orange text-base-green border-none hover:scale-95 transition-all ease-in duration-200 hover:text-white">
                        Enroll
                      </button>
                    </Link>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllClasses;
