import { useParams } from "react-router-dom";
import Container from "../../../../Shared/Container/Container";
import SectionHeader from "../../../../Shared/SectionHeader/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Shared/Loading/Loading";

const AddedClassProgress = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: feedbacksData = [], isLoading } = useQuery({
    queryKey: ["feedbacksData"],
    // enabled:
    queryFn: async () => {
      const res = await axiosSecure.get(`/feedbacks/${id}`);
      return res.data;
    },
  });
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading></Loading>
      </div>
    );
  }
  return (
    <div>
      <Container>
        <div className="min-h-screen">
          <SectionHeader
            title={"Here Some Students Feedback For This class"}
            description={
              "These feedbacks are help you to evaluate the progress of this class and also the user experience and learning experience in this website.You can also evaluate the teaching progress of the teacher."
            }
          ></SectionHeader>
          {feedbacksData.length === 0 ? (
            <p className="text-3xl font-semibold font-raleWay text-center text-base-orange mt-16">
              Currently no feedback is available for this class.....{" "}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {feedbacksData.map((data, idx) => (
                <div
                  key={idx}
                  className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-base-green"
                >
                  <div>
                    <button
                      className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                      tabIndex="0"
                    >
                      Ratings: {data?.rating}
                    </button>
                  </div>

                  <div className="mt-2">
                    <a
                      href="#"
                      className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
                      tabIndex="0"
                      role="link"
                    >
                      ClassTitle:{data?.classTitle}
                    </a>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {data?.feedback}
                    </p>
                  </div>

                  <div className=" mt-4">
                    <div className="flex items-center">
                      <img
                        className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                        src={data?.userImage}
                        alt="avatar"
                      />
                      <div>
                        <p
                          className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
                          tabIndex="0"
                          role="link"
                        >
                          {data?.userName}
                        </p>
                        <p
                          className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
                          tabIndex="0"
                          role="link"
                        >
                          {data?.userEmail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AddedClassProgress;
