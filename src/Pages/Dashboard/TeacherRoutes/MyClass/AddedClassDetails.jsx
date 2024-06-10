import { useParams } from "react-router-dom";
import Container from "../../../../Shared/Container/Container";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../../../Shared/SectionHeader/SectionHeader";
import { PiStudentBold } from "react-icons/pi";
import { MdAssignment, MdOutlineAddToPhotos } from "react-icons/md";
import { BiTask } from "react-icons/bi";

const AddedClassDetails = () => {
  const axiosCommon = useAxiosCommon();
  const { id } = useParams();

  const { data: classDetails = {} } = useQuery({
    queryKey: ["classDetails"],
    queryFn: async () => {
      const res = await axiosCommon.get(`/class/${id}`);
      return res.data;
    },
  });
  //   console.log(classDetails);
  return (
    <div>
      <Container>
        <div className="min-h-screen p-4 flex flex-col justify-center">
          <div>
            <SectionHeader
              title={`Track Class Progress of ${classDetails?.classTitle}`}
              description={`Welcome to the Class Progress section in your dashboard. Here, you can monitor and manage the progress of ${classDetails?.classTitle} class. This section provides you with detailed insights into each total enrollment, total assignment, and assignment completion rates.`}
            ></SectionHeader>
            <div className="mt-8">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                <div className="h-32 rounded-lg bg-base-green flex justify-center">
                  <div className="flex justify-center items-center gap-2 text-base-orange">
                    <div className="flex flex-col items-center">
                      <p className="text-3xl font-bold">
                        {classDetails?.totalEnrollment}
                      </p>
                      <p className="text-2xl font-medium flex items-center">
                        <PiStudentBold className="text-4xl" />
                        Total Enrollment
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-32 rounded-lg bg-base-green flex justify-center">
                  <div className="flex justify-center items-center gap-2 text-base-orange">
                    <div className="flex flex-col items-center">
                      <p className="text-3xl font-bold">
                        {classDetails?.assignment}
                      </p>
                      <p className="text-2xl font-medium flex items-center">
                        <MdAssignment className="text-4xl" />
                        Total Assignment
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-32 rounded-lg bg-base-green flex justify-center">
                  <div className="flex justify-center items-center gap-2 text-base-orange">
                    <div className="flex flex-col items-center">
                      <p className="text-3xl font-bold">0</p>
                      <p className="text-2xl font-medium flex items-center">
                        <BiTask className="text-4xl" />
                        Assignment Submission
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 mt-8">
            <SectionHeader
              title={`Create Assignment for ${classDetails?.classTitle}`}
              description={
                " Here, you can easily add new assignments to enhance your students' learning experience."
              }
            ></SectionHeader>
            <button className="flex items-center gap-1 text-xl font-raleWay font-semibold  p-3 rounded-tr-2xl rounded-bl-2xl bg-base-green text-base-orange hover:scale-90 transition-all duration-500 ease-in-out hover:border-2 hover:border-base-orange">
              <MdOutlineAddToPhotos className="text-2xl"></MdOutlineAddToPhotos>
              Create Assignment
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddedClassDetails;
