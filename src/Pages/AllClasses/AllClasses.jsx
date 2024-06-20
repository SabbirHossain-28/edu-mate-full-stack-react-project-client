import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import Container from "../../Shared/Container/Container";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import { Link } from "react-router-dom";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";

const AllClasses = () => {
  const axiosCommon = useAxiosCommon();
  // const axiosSecure = useAxiosSecure();

  const { data: acceptedClass = [],isLoading } = useQuery({
    queryKey: ["acceptedClass"],
    queryFn: async () => {
      const res = await axiosCommon.get("/allclasses/accepted");
      return res.data;
    },
  });
  console.log(acceptedClass);

  
  if(isLoading) return <div className="min-h-screen flex justify-center items-center"><Loading></Loading></div>
  return (
    <div>
      <Container>
        <div className="min-h-screen py-16">
          <SectionHeader
            title={"Explore Our Available Classes"}
            description={
              "Welcome to our class catalog! Here, you can find a wide variety of classes offered by our experienced teachers. All courses listed here have been carefully reviewed and approved by our admin team to ensure quality and relevance. Whether you're looking to advance your skills, explore new hobbies, or further your education, we have something for everyone. Browse through our offerings and start your learning journey today"
            }
          ></SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {acceptedClass.map((classData, idx) => (
              <div key={idx} className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md bg-base-green text-gray-100">
              <div className="flex space-x-4">
                <img alt="user-image" src={classData?.teacherImage} className="object-cover w-12 h-12 rounded-full shadow bg-gray-500" />
                <div className="flex flex-col space-y-1">
                  <a rel="noopener noreferrer" className="text-sm font-semibold">{classData?.teacherName}</a>
                  <span className="text-xs text-gray-400">{classData?.teacherEmail}</span>
                </div>
              </div>
              <div>
                <img src={classData?.classImage} alt="class-image" className="object-fit w-full mb-4 h-60  md:h-60 bg-gray-500" />
                <h2 className="mb-2 text-base lg:text-xl font-semibold h-12">{classData?.classTitle}</h2>
                <p className="text-sm text-gray-400">{classData?.classDescription.split("").slice(0,90)}......</p>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <div className="space-x-2">
                  <button aria-label="Share this post" type="button" className="p-2 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current text-base-orange">
                      <path d="M404,344a75.9,75.9,0,0,0-60.208,29.7L179.869,280.664a75.693,75.693,0,0,0,0-49.328L343.792,138.3a75.937,75.937,0,1,0-13.776-28.976L163.3,203.946a76,76,0,1,0,0,104.108l166.717,94.623A75.991,75.991,0,1,0,404,344Zm0-296a44,44,0,1,1-44,44A44.049,44.049,0,0,1,404,48ZM108,300a44,44,0,1,1,44-44A44.049,44.049,0,0,1,108,300ZM404,464a44,44,0,1,1,44-44A44.049,44.049,0,0,1,404,464Z"></path>
                    </svg>
                  </button>
                  <button aria-label="Bookmark this post" type="button" className="p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current text-base-orange">
                      <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"></path>
                    </svg>
                  </button>
                </div>
                <div className="flex space-x-2 text-sm text-gray-400">
                <Link to={`/classDetail-enroll/${classData?._id}`}>
                      <button className="border text-lg font-bold px-3 py-1  rounded-lg bg-base-orange text-base-green border-none hover:scale-95 transition-all ease-in duration-200 hover:text-white">
                        Enroll
                      </button>
                    </Link>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllClasses;
