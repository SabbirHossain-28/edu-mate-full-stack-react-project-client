import Marquee from "react-fast-marquee";
import { FaGooglePlusG } from "react-icons/fa";
import { TfiMicrosoft } from "react-icons/tfi";
import { SiCoursera, SiUdacity, SiEdx, SiKhanacademy } from "react-icons/si";

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
    <div className="my-12">
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

            <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
              {data.name}
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
              {data.description}
            </p>

            <div className="flex justify-end mt-4">
              <a
                href="#"
                className="text-lg font-medium text-blue-600 dark:text-blue-300"
                tabIndex="0"
                role="link"
              >
                {data.name}
              </a>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Partners;
