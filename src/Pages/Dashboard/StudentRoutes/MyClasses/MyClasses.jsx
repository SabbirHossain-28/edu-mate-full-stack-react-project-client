import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Container from "../../../../Shared/Container/Container";
import { Link } from "react-router-dom";


const MyClasses = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const { data: enrolledClassData = [] } = useQuery({
    queryKey: ["enrolledClassData", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClass/${user?.email}`);
      return res.data;
    },
  });
  console.log(enrolledClassData);
  return (
    <div>
      <Container>
        <div className="min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledClassData.map((data, idx) => (
              <div
                key={idx}
                className="max-w-2xl overflow-hidden bg-base-green rounded-lg shadow-md  hover:scale-95 hover:transition-all hover:ease-in hover:duration-200"
              >
                <img
                  className="object-fit w-full h-64"
                  src={data?.classImage}
                  alt="Article"
                />

                <div className="p-6">
                  <div className="h-24">
                    {/* <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                      Product
                    </span> */}
                    <a
                      className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                      tabIndex="0"
                      role="link"
                    >
                      {data?.classTitle}
                    </a>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          className="object-cover h-10 w-10 rounded-full"
                          src={data?.teacherImage}
                          alt="Avatar"
                        />
                        <a
                          className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                          tabIndex="0"
                          role="link"
                        >
                          {data?.teacherName}
                        </a>
                      </div>
                      <div>
                        <Link to={`/dashboard/enrollClassDetails/${data?._id}`}>
                        <button className="text-base-green bg-base-orange p-1 font-poppin font-semibold rounded-lg hover:scale-95 hover:text-white hover:transition-all hover:ease-in hover:duration-300">Continue</button>
                        </Link>
                      </div>
                      
                    </div>
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

export default MyClasses;
