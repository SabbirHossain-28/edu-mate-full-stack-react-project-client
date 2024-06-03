import { useState } from "react";
import bannerImage1 from "../../assets/images/bannerImage/banner1.png";
import bannerImage2 from "../../assets/images/bannerImage/banner2.jpg";
import bannerImage3 from "../../assets/images/bannerImage/banner3.jpg";
import bannerImage4 from "../../assets/images/bannerImage/banner4.jpg";
import bannerImage5 from "../../assets/images/bannerImage/banner5.jpg";
import bannerImage6 from "../../assets/images/bannerImage/banner6.jpg";

const Banner = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const sliders = [
    {
      img: bannerImage1,
      title: "Unlock Your Potential with EduMate",
      des: "Join EduMate and embark on a journey of learning and growth. Connect with top educators and explore a wide range of courses designed to enhance your skills and knowledge",
    },
    {
      img: bannerImage2,
      title: "Empowering Education with EduMate",
      des: "At EduMate, we believe in the power of education to transform lives. Discover our diverse courses, expert tutors, and innovative learning tools to achieve your educational goals.",
    },
    {
      img: bannerImage3,
      title: "Learn, Teach, Inspire with EduMate",
      des: "EduMate brings together students and teachers in a collaborative learning environment. Explore our platform to find the perfect course or become a mentor to inspire others.",
    },
    {
      img: bannerImage4,
      title: "Your Path to Success with EduMate",
      des: "EduMate offers a comprehensive suite of courses to help you succeed in your academic and professional endeavors. Learn from the best and take your skills to the next level.",
    },
    {
      img: bannerImage5,
      title: "Education Without Boundaries with EduMate",
      des: "Break free from traditional learning constraints with EduMate. Our platform provides flexible, accessible, and high-quality educational resources for learners of all levels.",
    },
    {
      img: bannerImage6,
      title: "Innovate Your Learning with EduMate",
      des: "Experience cutting-edge education with EduMate. From interactive classes to personalized learning paths, we provide the tools you need to thrive in a dynamic world.",
    },
  ];
  const prevSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? sliders.length - 1 : currentSlider - 1
    );
  const nextSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === sliders.length - 1 ? 0 : currentSlider + 1
    );
  const isSmallScreen = window.innerWidth <= 768;
  return (
    <div>
      <div
        className="w-full h-60 sm:h-96 md:h-[640px] flex flex-col xl:flex-row items-center justify-center gap-5 lg:gap-10 relative bg-no-repeat bg-cover bg-center before:absolute before:bg-black/50 before:inset-0 transform duration-1000 ease-linear  overflow-hidden"
        style={{
          backgroundImage: `url(${
            currentSlider === 0
              ? sliders[sliders.length - 1].img
              : sliders[currentSlider - 1].img
          })`,
        }}
      >
        {/* arrow */}
        <div className="absolute bottom-2 md:bottom-48 left-0 md:left-0 flex gap-3 z-50 px-5">
          {/* arrow left */}
          <button
            onClick={prevSlider}
            className="flex justify-center items-center bg-white/30 rounded-full w-6 h-6 md:w-10 md:h-10"
          >
            <svg
              viewBox="0 0 1024 1024"
              className="w-4 h-4 md:w-6 md:h-6 icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#F2871D"
                  d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
                ></path>
              </g>
            </svg>
          </button>
          {/* arrow right */}
          <button
            onClick={nextSlider}
            className="flex justify-center items-center bg-white/30 rounded-full w-6 h-6 md:w-10 md:h-10"
          >
            <svg
              viewBox="0 0 1024 1024"
              className="w-4 h-4 md:w-6 md:h-6 icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              transform="rotate(180)"
            >
              <g strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#F2871D"
                  d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        {/* text container here */}
        <div className="w-1/2 px-4 left-0 absolute drop-shadow-lg text-white rounded-lg ">
          <h1 className="lg:text-3xl mb-3">{sliders[currentSlider].title}</h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg">
            {sliders[currentSlider].des}
          </p>
        </div>
        {/* slider container */}
        <div className="w-1/2 ml-auto overflow-hidden  absolute -right-5 lg:-right-16 z-50 px-4 py-10">
          <div
            className="ease-linear duration-300 flex gap-4 items-center"
            style={{
              transform: `translateX(-${
                currentSlider * (isSmallScreen ? 98 : 200)
              }px)`,
            }}
          >
            {/* sliders */}
            {sliders.map((slide, inx) => (
              <img
                key={inx}
                src={slide.img}
                className={`h-[180px] sm:h-[200px] lg:h-[320px] min-w-[90px] lg:min-w-[184px] ${
                  currentSlider - 1 === inx ? "scale-0" : "scale-100 delay-500"
                } drop-shadow-lg shadow-lg shadow-black bg-black/50 duration-300 rounded-lg z-50`}
                alt={slide.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
