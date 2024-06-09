import { GiCrossMark } from "react-icons/gi";
import PropTypes from "prop-types";
import { ImSpinner9 } from "react-icons/im";

const UpdateModal = ({
  classData,
  handleModalClose,
  handleSubmit,
  onSubmit,
  register,
  errors,
  classImage,
  setClassImage,
  setIsImageChanged,
  loading,
}) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-base-green bg-opacity-50">
        <div className="modal-box rounded bg-base-green p-8">
          <div className="text-center text-base-orange">
            <h2 className="text-3xl font-poppin font-medium">
              Update Your Class
            </h2>
          </div>
          <div>
            <button
              title="Close Modal"
              onClick={handleModalClose}
              className="absolute top-4 right-4"
            >
              <GiCrossMark className="text-base-orange text-2xl"></GiCrossMark>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
            <div>
              <label className="text-gray-200 text-lg block mb-2">Title</label>
              <input
                type="text"
                defaultValue={classData?.classTitle}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                {...register("classTitle", {
                  required: "Class Title is required",
                })}
              />
              {errors.classTitle && (
                <span className="text-red-500 text-sm">
                  {errors.classTitle.message}
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-200 text-lg block mb-2">Price</label>
              <input
                type="number"
                defaultValue={classData?.price}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && (
                <span className="text-red-500 text-sm">
                  {errors.price.message}
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-200 text-lg block mb-2">
                Description
              </label>
              <textarea
                defaultValue={classData?.classDescription}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                {...register("classDescription", {
                  required: "Description is required",
                })}
              />
              {errors.classDescription && (
                <span className="text-red-500 text-sm">
                  {errors.classDescription.message}
                </span>
              )}
            </div>
            <div className="mb-4 flex items-end gap-2">
              <div className="flex-1">
                <label className="block mb-2 text-lg text-gray-200">
                  Profile Image
                </label>
                <input
                  type="file"
                  className="w-full px-3 py-2 border-gray-300 bg-white rounded-lg border"
                  {...register("classImage")}
                  onChange={(e) => {
                    setClassImage(URL.createObjectURL(e.target.files[0]));
                    setIsImageChanged(true);
                  }}
                />
              </div>
              <div>
                {classImage && (
                  <img
                    src={classImage}
                    alt="Profile Preview"
                    className="mt-2 w-16 h-16 object-cover rounded-xl"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="btn  bg-base-orange border-none text-lg text-white hover:bg-white hover:text-base-orange"
              >
                {loading ? (
                  <ImSpinner9 className="animate-spin text-2xl text-base-orange m-auto" />
                ) : (
                  "Update Class Data"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

UpdateModal.propTypes = {
  classData: PropTypes.object,
  handleModalClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  classImage: PropTypes.string,
  setClassImage: PropTypes.func,
  setIsImageChanged: PropTypes.func,
  loading: PropTypes.bool,
};
export default UpdateModal;
