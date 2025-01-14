import { useMutation, useQuery } from "@tanstack/react-query";
import Container from "../../Shared/Container/Container";
import SectionHeader from "../../Shared/SectionHeader/SectionHeader";
import useAuth from "../../Hooks/useAuth";
// import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getUploadedImgUrl } from "../../Utilities/APIutils/imageHostingapi";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const TeachOn = () => {
  const { user } = useAuth();
  // const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const [profileImage, setProfileImage] = useState("");
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: userData = {} } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  const { data: applicationData = [], refetch } = useQuery({
    queryKey: ["appilcationData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const hasPending = applicationData.some((app) => app?.status === "Pending");
  const hasRejected = applicationData.some((app) => app?.status === "Rejected");

  useEffect(() => {
    if (userData) {
      setProfileImage(userData?.image);
    }
  }, [userData]);
  useEffect(() => {
    return () => {
      if (profileImage && isImageChanged) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage, isImageChanged]);

  const { mutateAsync } = useMutation({
    mutationFn: async (applicationData) => {
      const res = await axiosSecure.post("/applications", applicationData);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    let imageURL = profileImage;
    if (isImageChanged) {
      const imageFile = data.profileImage[0];
      imageURL = await getUploadedImgUrl(imageFile);
    }
    const applicationData = {
      userId: userData._id,
      userEmail: userData.email,
      userName: userData.name,
      experience: data.experience,
      title: data.title,
      category: data.category,
      userProfileImage: imageURL,
      status: "Pending",
    };
    await mutateAsync(applicationData, {
      onSuccess: (data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Application Submitted",
            text: "Your application has been submitted for review.",
            icon: "success",
            background: "#07332F",
            color: "#F2871D",
          });
          refetch();
          setLoading(false);
          reset();
        }
      },
      onError: (error) => {
        console.error("Error submitting application", error);
        Swal.fire(
          "Error",
          "There was an error submitting your application",
          "error"
        );
      },
    });
  };

  if (userData?.role === "Admin") {
    Swal.fire({
      title: "Sorry Sir",
      text: "Admin can not apply for a teacher post!",
      icon: "warning",
      confirmButtonColor: "#F2871D",
      confirmButtonText: "Ok",
      background: "#07332F",
      color: "#F2871D",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        return;
      }
    });
  }

  if (hasPending) {
    return (
      <div className="bg-slate-200 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl font-pop font-bold mb-4 text-gray-700 dark:text-gray-400">
            Teacher request is successfully submited
          </h2>
          <p className="text-2xl font-poppin text-gray-700 dark:text-gray-400">
            Your given information and request for a teacher post is submitted
            successfully. Please wait for admin approval
          </p>
        </div>
      </div>
    );
  }

  if (userData?.role === "Teacher") {
    return (
      <div className="bg-slate-200 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl font-pop font-bold mb-4 text-gray-700 dark:text-gray-400">
            Congratulations!{userData?.name}
          </h2>
          <p className="text-2xl font-poppin text-gray-700 dark:text-gray-400">
            You have been approved as a Teacher.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <div className="py-16">
        <div className="pt-4 ">
          <SectionHeader
            title={"Apply to Teach on EduMate"}
            description={
              "EduMate allows you to apply for a teaching position by filling out the required form. Share your details, choose your experience level, and select the category you wish to teach. Submit your application for review, and our admin team will process your request. If approved, you'll join our community as a teacher."
            }
          ></SectionHeader>
          {hasRejected && (
            <div className="text-center mt-4">
              <p className="text-red-500 font-raleWay font-bold">
                Sorry! Your request for wanted to be a teacher in our platform
                is rejected by Admin....You can try for another request.
              </p>
            </div>
          )}
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
                  defaultValue={userData?.name}
                  disabled
                  className={`w-full px-3 py-2 border border-gray-300 bg-white  rounded-lg`}
                  {...register("name")}
                />
              </div>

              <div className="mb-4 flex items-center gap-2">
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    className="w-full px-3 py-2 border-gray-300 bg-white rounded-lg border"
                    {...register("profileImage")}
                    onChange={(e) => {
                      setProfileImage(URL.createObjectURL(e.target.files[0]));
                      setIsImageChanged(true);
                    }}
                  />
                </div>
                <div>
                  {profileImage && (
                    <img
                      src={profileImage}
                      alt="Profile Preview"
                      className="mt-2 w-20 h-20 object-cover rounded-xl"
                    />
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg"
                  defaultValue={userData.email}
                  disabled
                  {...register("email")}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Experience Level
                </label>
                <select
                  className={`w-full px-3 py-2 border ${
                    errors.experience ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                  defaultValue=""
                  {...register("experience", {
                    required: "Experience level is required",
                  })}
                >
                  <option value="" disabled>
                    Select your experience level
                  </option>
                  <option value="beginner">Beginner</option>
                  <option value="mid-level">Mid-level</option>
                  <option value="experienced">Experienced</option>
                </select>
                {errors.experience && (
                  <span className="text-red-500 text-sm">
                    {errors.experience.message}
                  </span>
                )}
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
                  Category
                </label>
                <select
                  className={`w-full px-3 py-2 border ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                  defaultValue=""
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="web development">Web Development</option>
                  <option value="digital marketing">Digital Marketing</option>
                  <option value="graphic design">Graphic Design</option>
                  <option value="data science">Data Science</option>
                  <option value="project management">Project Management</option>
                </select>
                {errors.category && (
                  <span className="text-red-500 text-sm">
                    {errors.category.message}
                  </span>
                )}
              </div>
              {hasRejected ? (
                <button
                  type="submit"
                  className="w-full py-3 mt-4 text-center text-white bg-base-green rounded-lg hover:bg-base-orange"
                >
                  {loading ? (
                    <ImSpinner9 className="animate-spin text-2xl text-base-orange m-auto" />
                  ) : (
                    "Request to another"
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 mt-4 text-center text-white bg-base-green rounded-lg hover:bg-base-orange"
                >
                  {loading ? (
                    <ImSpinner9 className="animate-spin text-2xl text-base-orange m-auto" />
                  ) : (
                    "Submit for Review"
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TeachOn;
