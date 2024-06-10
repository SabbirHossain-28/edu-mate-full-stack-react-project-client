import { useForm } from "react-hook-form";
import Container from "../../../../Shared/Container/Container";
import SectionHeader from "../../../../Shared/SectionHeader/SectionHeader";
import { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { getUploadedImgUrl } from "../../../../Utilities/APIutils/imageHostingapi";
import { useMutation } from "@tanstack/react-query";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const [classImage, setClassImage] = useState("");
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: async (classData) => {
      const res = await axiosCommon.post("/classes", classData);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = data.classImage[0];
    const imageURL = await getUploadedImgUrl(imageFile);
    const classData = {
      teacherName: user?.displayName,
      teacherEmail: user?.email,
      teacherImage: user?.photoURL,
      classTitle: data.title,
      price: data.price,
      classDescription: data.description,
      classImage: imageURL,
      status: "Pending",
      assignment:0,
      totalEnrollment:0,
    };

    await mutateAsync(classData, {
      onSuccess: (data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Submitted Successfull",
            text: "Your class has been submitted for admin approval",
            icon: "success",
          });
          setLoading(false);
          setClassImage("");
          reset();
          navigate("/dashboard/myClass");
        }
      },
      onError: (error) => {
        console.error("Error submitting class", error);
        Swal.fire("Error", "There was an error submitting your class", "error");
      },
    });
  };
  return (
    <Container>
      <div className="pt-4">
        <SectionHeader
          title={"Create a New Class on EduMate"}
          description={
            "Welcome to the class creation page! As a valued teacher on EduMate, you have the opportunity to share your knowledge and expertise with eager students. Use this form to add a new class, including all necessary details such as class title, description, price and schedule. Your class will be reviewed by our honourable admin and, once approved, will be available for students to enroll in. Let's create an engaging and informative class to help students achieve their learning goals!"
          }
        ></SectionHeader>
      </div>
      <div className="pb-12">
        <div className="max-w-4xl mx-auto mt-10 p-5 border border-gray-600 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Name
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                className={`w-full px-3 py-2 border border-gray-300 bg-white  rounded-lg`}
                {...register("name")}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg"
                defaultValue={user?.email}
                readOnly
                {...register("email")}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Title
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                placeholder="Enter the title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Price
              </label>
              <input
                type="number"
                className={`w-full px-3 py-2 border ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                placeholder="Enter the Price"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && (
                <span className="text-red-500 text-sm">
                  {errors.price.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Description
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                placeholder="Enter the Description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex-1">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Class Image
                </label>
                <input
                  type="file"
                  className="w-full px-3 py-2 border-gray-300 bg-white rounded-lg border"
                  {...register("classImage", {
                    required: "Class image is required",
                  })}
                  onChange={(e) => {
                    setClassImage(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </div>
              <div>
                {classImage && (
                  <img
                    src={classImage}
                    alt="Profile Preview"
                    className="mt-2 w-20 h-20 object-cover rounded-xl"
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 text-center text-white bg-base-green rounded-lg hover:bg-blue-700"
            >
              {loading ? (
                <ImSpinner9 className="animate-spin text-2xl text-base-orange m-auto" />
              ) : (
                "Add Class"
              )}
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default AddClass;
