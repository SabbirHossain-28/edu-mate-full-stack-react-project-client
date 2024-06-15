import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
// import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import Container from "../../../../Shared/Container/Container";
import { LuClipboardEdit } from "react-icons/lu";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import UpdateModal from "../../../../Components/DashboardComponent/Modal/UpdateModal";
import { useForm } from "react-hook-form";
import { getUploadedImgUrl } from "../../../../Utilities/APIutils/imageHostingapi";
import Loading from "../../../../Shared/Loading/Loading";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const MyClass = () => {
  const { user,loading:userLoading } = useAuth();
  // const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classImage, setClassImage] = useState("");
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    data: requestedClasses = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["requestedClasses",user?.email,currentPage],
    enabled: !userLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${user?.email}?page=${currentPage}&size=${10}`);
      return res.data;
    },
  });

  const { data: count = 0 } = useQuery({
    queryKey: ["count",user?.email],
    enabled:!userLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacherCountedClass/${user?.email}`);
      return res.data.result;
    },
  });
  console.log(count);

  const numberOfPages = Math.ceil(count / 10);
  const pages = [
    ...Array(numberOfPages)
      .keys()
      .map((key) => key + 1),
  ];

  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  };

  const { mutateAsync: mutateDelete } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/classes/${id}`);
      return res.data;
    },
  });

  const handleClassDelete = (id, classTitle) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your added class will be delete permanently!",
      icon: "warning",
      showCancelButton: true,
      background: "#07332F",
      color: "#F2871D",
      confirmButtonColor: "#F2871D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateDelete(id, {
          onSuccess: (data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: `${classTitle} class has been deleted.`,
                icon: "success",
                background: "#07332F",
                color: "#F2871D",
              });
              refetch();
            }
          },
          onError: (error) => {
            console.error("Error deleting class", error);
            Swal.fire(
              "Error",
              "There was an error deleting your added class",
              "error"
            );
          },
        });
      }
    });
  };

  useEffect(() => {
    if (selectedClass) {
      setClassImage(selectedClass?.classImage);
    }
  }, [selectedClass]);

  useEffect(() => {
    return () => {
      if (classImage && isImageChanged) {
        URL.revokeObjectURL(classImage);
      }
    };
  }, [classImage, isImageChanged]);

  const { mutateAsync: mutateUpdate } = useMutation({
    mutationFn: async (updateClassData) => {
      const res = await axiosSecure.patch(
        `/classes/${selectedClass?._id}`,
        updateClassData
      );
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    let imageURL = classImage;
    if (isImageChanged) {
      const imageFile = data?.classImage[0];
      imageURL = await getUploadedImgUrl(imageFile);
    }
    const updateClassData = {
      classTitle: data?.classTitle,
      price: data?.price,
      classDescription: data?.classDescription,
      classImage: imageURL,
    };
    await mutateUpdate(updateClassData, {
      onSuccess: (data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Update Successfull",
            text: "Your class data has been updated successfully.",
            icon: "success",
            background: "#07332F",
            color: "#F2871D",
          });
          setLoading(false);
          reset();
          setIsModalOpen(false);
          refetch();
        }
      },
      onError: (error) => {
        console.log("Error updating class data", error);
        Swal.fire(
          "Error",
          "There was an error submitting your application",
          "error"
        );
      },
    });
  };

  const handleModalOpen = (classData) => {
    setIsModalOpen(true);
    setSelectedClass(classData);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
  };
  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading></Loading>
      </div>
    );

  if (requestedClasses.length === 0) {
    return (
      <div className="bg-slate-200 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-pop font-bold mb-4">
            Opppsss!!!!....There is no added class data for you!
          </h2>
          <p className="text-xl font-poppin">
            You are not add any single class and for that you have no data in my
            class page..Please add class as soon as possible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-200 min-h-screen my-auto">
      <Container>
        <div className="pt-16">
          <div className="overflow-x-auto bg-base-green border-2 border-black p-2">
            <table className="table">
              <thead className="text-gray-300">
                <tr>
                  <th>Teacher Image</th>
                  <th>Teacher Name</th>
                  <th>Teacher Email</th>
                  <th>Class image</th>
                  <th>Class Title</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>Delete</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                {requestedClasses.map((data, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={data?.teacherImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{data?.teacherName}</td>
                    <td>{data?.teacherEmail}</td>
                    <td>{data?.classTitle}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className={`avatar border-4 rounded-2xl ${
                            data?.status === "Pending" && "border-base-orange"
                          } ${
                            data?.status === "Accepted" && "border-green-500"
                          } ${data?.status === "Rejected" && "border-red-500"}`}
                        >
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={data?.classImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{data?.price}</td>
                    <td>
                      {data?.classDescription.split("").slice(0, 40)}.......
                    </td>
                    <td
                      className={`${
                        data?.status === "Accepted" &&
                        "font-semibold text-green-500"
                      } ${
                        data?.status === "Pending" &&
                        "font-semibold text-blue-500"
                      }${
                        data?.status === "Rejected" &&
                        "font-semibold text-red-500"
                      }`}
                    >
                      {data?.status}
                    </td>
                    <td>
                      <button
                        onClick={() => handleModalOpen(data)}
                        className="p-2 rounded-lg bg-base-orange text-[#151515] hover:scale-95"
                      >
                        <LuClipboardEdit className="text-xl"></LuClipboardEdit>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleClassDelete(data?._id, data?.classTitle)
                        }
                        className="p-2 rounded-lg bg-red-500 text-[#151515] hover:scale-95"
                      >
                        <RiDeleteBin2Line className="text-xl"></RiDeleteBin2Line>
                      </button>
                    </td>
                    <td>
                      <Link to={`/dashboard/my-class/${data?._id}`}>
                        <button
                          disabled={
                            data?.status === "Pending" ||
                            data?.status === "Rejected"
                          }
                          className={`p-2 rounded-lg  text-[#151515] ${
                            data?.status === "Accepted" &&
                            "bg-green-500 hover:scale-95"
                          } ${data?.status === "Rejected" && "bg-red-500"}`}
                        >
                          <TbListDetails className="text-xl"></TbListDetails>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <UpdateModal
              classData={selectedClass}
              handleModalClose={handleModalClose}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
              errors={errors}
              classImage={classImage}
              setClassImage={setClassImage}
              setIsImageChanged={setIsImageChanged}
              loading={loading}
            ></UpdateModal>
          )}
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
      </Container>
    </div>
  );
};

export default MyClass;
