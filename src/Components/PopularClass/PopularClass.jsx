import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import Container from "../../Shared/Container/Container";
import { Link } from "react-router-dom";

const PopularClass = () => {
  const axiosCommon = useAxiosSecure();

  const { data: PopularClasses = [] } = useQuery({
    queryKey: ["PopularClasses"],
    queryFn: async () => {
      const res = await axiosCommon.get("/all-classes/max-enrollment");
      return res.data;
    },
  });

  console.log(PopularClasses);
  return (
    <div>
      <Container>
        <div className="mb-8">
          <SectionHeader
            title={"Top Picks: Our Most Popular Classes"}
            description={
              "Explore our most sought-after classes, carefully selected based on the highest enrollments. Discover the details of these trending courses and see why they are favorites among our learners. Join now to elevate your skills with the best of Edumate!"
            }
          ></SectionHeader>
        </div>
        <div>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            autoplay={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {PopularClasses.map((data, idx) => (
              <SwiperSlide key={idx}>
                <div className="max-w-lg p-4 shadow-lg bg-base-green text-gray-100 rounded-lg">
                  <div className="flex justify-between pb-4 border-bottom">
                    <div className="flex items-center">
                      <p
                        rel="noopener noreferrer"
                        className="mb-0 capitalize text-gray-100"
                      >
                        Total Enrollment
                      </p>
                    </div>
                    <p rel="noopener noreferrer">
                      {data?.totalEnrollment}/Students
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <img
                        src={data?.classImage}
                        alt=""
                        className="block object-fit object-center w-full rounded-md h-72 bg-gray-500"
                      />
                      <div className="flex items-center text-xs">
                        <span>
                          Teacher: {data?.teacherName}/{data?.teacherEmail}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p rel="noopener noreferrer" className="block">
                        <h3 className="text-xl h-16 font-semibold text-gray-200">
                          {data?.classTitle}
                        </h3>
                      </p>
                      <p className="leading-snug h-16 text-gray-400">
                        {data?.classDescription.split("").slice(0, 110)}....
                        <Link to={`/classDetail-enroll/${data?._id}`}>
                          <button className="text-base-orange font-semibold underline">
                            Learn More
                          </button>
                        </Link>
                      </p>
                      <span></span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default PopularClass;
