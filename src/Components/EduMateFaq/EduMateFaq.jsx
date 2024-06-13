import Container from "../../Shared/Container/Container";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";

const EduMateFaq = () => {
  const quesAns = [
    {
      question: "What is EduMate and how does it work?",
      answer:
        "EduMate is an online learning platform designed to connect students with expert teachers and comprehensive courses. Users can browse through a variety of classes, enroll in the ones that interest them, and access a wealth of resources to enhance their learning. Teachers can create and manage their courses, assignments, and interact with students to provide a personalized learning experience.",
    },
    {
      question: "How can I enroll in a course on EduMate?",
      answer:
        "To enroll in a course, first, create an account or log in to your existing one. Browse through the available courses and select the one you want to join. Click on the 'Enroll' button and follow the payment process if required. Once enrolled, you will have full access to the course materials and resources.",
    },
    {
      question: "Are there any free courses available on EduMate?",
      answer:
        "Yes, EduMate offers a range of free courses across various subjects. You can filter the courses by price to find free options. Our free courses are designed to provide high-quality education accessible to everyone.",
    },
    {
      question: "How do I become a teacher on EduMate?",
      answer:
        "If you're interested in teaching on EduMate, you need to apply through our platform. Go to the 'Become a Teacher' section or 'Teach On EduMate' page, fill out the application form with your details and qualifications, and submit it. Our Admin will review your application and get back to you with the next steps if you meet the criteria.",
    },
    {
      question: "What payment methods are accepted for enrolling in courses?",
      answer:
        "Currently EduMate accepts only ''Stripe' payment methods, including 'VISA CARD' and PayPal. All transactions are secure and encrypted to ensure your financial information is protected. You can also find more details on payment options during the checkout process.",
    },
  ];
  return (
    <div>
      <Container>
        <div className="mb-8">
          <SectionHeader
            title={"Frequently Asked Questions (FAQ)"}
            description={
              "Welcome to the Frequently Asked Questions (FAQ) section! Here, you'll find answers to some of the most common inquiries about EduMate. Whether you're a student, teacher, or just curious about our platform, this section aims to provide you with clear and concise information to help you navigate and make the most out of your EduMate experience. If you have any further questions, feel free to reach out to our support team."
            }
          ></SectionHeader>
        </div>
        <div className="space-y-6 max-w-7xl mx-auto">
          {quesAns.map((data, idx) => (
            <details
              key={idx}
              className="group border-s-4 border-base-orange rounded-lg bg-base-green p-8 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                <h2 className="text-lg font-medium text-base-orange">
                  {data.question}
                </h2>

                <span className="shrink-0 rounded-full bg-base-orange p-1.5 text-white sm:p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <p className="mt-4 leading-relaxed text-gray-400">
                {data.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default EduMateFaq;
