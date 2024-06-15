import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Container from "../../../../Shared/Container/Container";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { jsPDF } from "jspdf";
import { useState } from "react";


const MyOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: enrolledClassData = [] } = useQuery({
    queryKey: ["enrolledClassData", user?.email,currentPage],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClass/${user?.email}?page=${currentPage}&size=${10}`);
      return res.data;
    },
  });

  const { data: count = 0 } = useQuery({
    queryKey: ["count",user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/countedEnrolledClass/${user?.email}`);
      return res.data.result;
    },
  });

  const numberOfPages = Math.ceil(count / 10);
  const pages = [
    ...Array(numberOfPages)
      .keys()
      .map((key) => key + 1),
  ];

  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  };

  const generatePDF =(data)=>{
    const doc=new jsPDF();

    doc.setFontSize(20);
    doc.text("Invoice",10,10);
    doc.setFontSize(20);
    doc.text(`Class Title: ${data.classTitle}`, 10, 20);
    doc.text(`Student Email: ${data.studentEmail}`, 10, 30);
    doc.text(`Teacher Email: ${data.teacherEmail}`, 10, 40);
    doc.text(`Price: ${data.price} $`, 10, 50);
    doc.text(`Transaction Id: ${data.transactionId}`, 10, 60);

    doc.save(`invoice_${data.transactionId}.pdf`);
  }
  return (
    <div>
      <div className="bg-slate-200 min-h-screen my-auto">
        <Container>
          <div className="pt-16">
            <div className="overflow-x-auto p-2 border-2 border-black bg-base-green">
              <table className="table">
                <thead className="text-gray-300">
                  <tr>
                    <th>Class Image</th>
                    <th>Class Title</th>
                    <th>Student Email</th>
                    <th>Teacher Email</th>
                    <th>Price</th>
                    <th>Transaction Id</th>
                    <th>Invoice</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  {enrolledClassData.map((data, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className={"avatar "}>
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={data?.classImage}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{data?.classTitle}</td>
                      <td>{data?.studentEmail}</td>
                      <td>{data?.teacherEmail}</td>
                      <td>
                        {data?.price} <br /> $
                      </td>
                      <td>{data?.transactionId}</td>

                      <td>
                        <button
                          onClick={() => generatePDF(data)}
                          className="p-2 bg-base-orange rounded-lg hover:scale-95"
                        >
                          <FaFileInvoiceDollar className="text-2xl text-white"></FaFileInvoiceDollar>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
        <ol className="flex justify-center gap-1 text-xs font-medium mt-4">
            <li>
              <button
                disabled={currentPage === 1}
                onClick={() => handleCurrentPage(currentPage - 1)}
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>

            <li className="flex gap-2">
              {pages.map((page, idx) => (
                <button
                  onClick={() => handleCurrentPage(page)}
                  key={idx}
                  className={`${
                    currentPage === page
                      ? "bg-base-orange text-black dark:text-white border-2 border-black"
                      : "bg-white text-gray-900 dark:text-white"
                  }block size-8 rounded   text-center leading-8 `}
                >
                  {page}
                </button>
              ))}
            </li>

            <li>
              <button
                disabled={currentPage === numberOfPages}
                onClick={() => handleCurrentPage(currentPage + 1)}
                className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ol>
      </div>
    </div>
    // <div>hello</div>
  );
};

export default MyOrder;
