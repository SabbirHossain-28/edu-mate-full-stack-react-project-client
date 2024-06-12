import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import { Navigation } from "swiper/modules";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import Loading from "../../Shared/Loading/Loading";

const Feedback = () => {
  const axiosCommon = useAxiosCommon();
  const { data: feedbacksData = [], isLoading } = useQuery({
    queryKey: ["feedbacksData"],
    // enabled:
    queryFn: async () => {
      const res = await axiosCommon.get(`/allFeedbacks`);
      return res.data;
    },
  });
  console.log(feedbacksData);

  return (
    <div className="my-16 max-w-7xl mx-auto">
      <div className="flex justify-center text-center mb-8">
        <SectionHeader
          title={"Hear What Our Users Have to Say"}
          description={
            "We value the opinions and experiences of our users. Here, you can read authentic feedback from our community, sharing their thoughts and experiences with our product/service. Your insights help us improve and serve you better. We encourage you to share your own feedback to contribute to our continuous growth and improvement. Thank you for being a part of our journey!"
          }
        ></SectionHeader>
      </div>
      <div className="text-center">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loading></Loading>
            </div>
          ) : (
            <div>
              {feedbacksData.map((data, idx) => (
                <SwiperSlide key={idx}>
                  <div className=" px-12 lg:px-24">
                    <div className="rounded-lg bg-base-green p-6 shadow-sm sm:p-8">
                      <div className="flex items-center gap-4">
                        <img
                          alt=""
                          src={data?.userImage}
                          className="size-16 rounded-full object-cover"
                        />

                        <div>
                          <div>
                            <Rating
                              style={{ maxWidth: 180 }}
                              value={data.rating}
                              readOnly
                            ></Rating>
                          </div>

                          <p className="mt-0.5 text-lg font-medium text-gray-200">
                            {data?.userName}
                          </p>
                        </div>
                      </div>

                      <div className="h-32">
                        <p className="mt-4 text-gray-400">{data?.feedback}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Feedback;
