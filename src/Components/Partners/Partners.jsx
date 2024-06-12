import Marquee from "react-fast-marquee";
import { FaGooglePlusG } from "react-icons/fa";
import { TfiMicrosoft } from "react-icons/tfi";
import { SiCoursera, SiUdacity, SiEdx, SiKhanacademy } from "react-icons/si";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";

const partners = [
  {
    logo: <FaGooglePlusG></FaGooglePlusG>,
    name: "Google",
    description:
      "Google collaborates with us to bring the best tutors and technological solutions.",
  },
  {
    logo: <TfiMicrosoft></TfiMicrosoft>,
    name: "Microsoft",
    description:
      "Microsoft supports our platform with educational tools and resources.",
  },
  {
    logo: <SiCoursera></SiCoursera>,
    name: "Coursera",
    description:
      "Coursera provides a wide range of online courses in collaboration with top universities.",
  },
  {
    logo: <SiEdx></SiEdx>,
    name: "edX",
    description:
      "edX partners with us to offer courses from world-class institutions.",
  },
  {
    logo: <SiKhanacademy></SiKhanacademy>,
    name: "Khan Academy",
    description:
      "Khan Academy offers free educational resources and courses for students worldwide.",
  },
  {
    logo: <SiUdacity></SiUdacity>,
    name: "Udacity",
    description:
      "Udacity provides industry-recognized nano-degree programs and online courses.",
  },
  // Add more partners as needed
];
const Partners = () => {
  return (
    <div className="bg-slate-200 py-12">
      <div className="max-w-7xl mx-auto">
      <SectionHeader
        title={"Our Esteemed Partners and Collaborators"}
        description={
          "At EduMate, we are proud to collaborate with industry leaders and esteemed organizations that share our vision of revolutionizing education. Our partners bring a wealth of expertise, resources, and innovation, helping us provide the best learning experience possible.  Meet our trusted partners and discover how our collaborations are shaping the future of education."
        }
      ></SectionHeader>
      <Marquee>
        {partners.map((data, idx) => (
          <div
            key={idx}
            className="w-full max-w-md px-8 py-4 mt-16 bg-[#07332F] rounded-lg shadow-lg mr-4"
          >
            <div className="flex justify-center -mt-16 md:justify-end">
              {/* <img
                    className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
                    alt="Testimonial avatar"
                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                /> */}
              <div className="flex justify-center items-center w-20 h-20  rounded-full bg-[#F2871D]">
                <p className="text-4xl text-white">{data.logo}</p>
              </div>
            </div>

            <h2 className="mt-2 text-xl font-poppin font-semibold text-gray-800 dark:text-white md:mt-0">
              {data.name}
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 font-poppin">
              {data.description}
            </p>

            <div className="flex justify-end mt-4">
              <p
                className="text-lg font-pop font-medium text-blue-600 dark:text-blue-300"
                tabIndex="0"
                role="link"
              >
                {data.name}
              </p>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
    </div>
  );
};

export default Partners;
