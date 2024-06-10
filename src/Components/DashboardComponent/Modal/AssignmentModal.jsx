import PropTypes from "prop-types";
import { GiCrossMark } from "react-icons/gi";
import { ImSpinner9 } from "react-icons/im";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AssignmentModal = ({
  handleModalClose,
  handleSubmit,
  onSubmit,
  register,
  errors,
  startDate,
  setStartDate,
  loading,
}) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-base-green bg-opacity-50">
        <div className="modal-box rounded bg-base-green p-8">
          <div className="text-center text-base-orange mb-4">
            <h2 className="text-3xl font-poppin font-medium">
              Create Assignment Here
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="text-center">
              <label className="text-gray-200 text-lg block mb-2">
                Assignment Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter title of assignment"
                {...register("assignmentTitle", {
                  required: "Assignment Title is required",
                })}
              />
              {errors.assignmentTitle && (
                <span className="text-red-500 text-sm">
                  {errors.assignmentTitle.message}
                </span>
              )}
            </div>
            <div className="text-center">
              <label className="text-gray-200 text-lg block mb-2">
                Assignment Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter description of assignment"
                {...register("assignmentDescription", {
                  required: "Assignment Description is required",
                })}
              />
              {errors.assignmentDescription && (
                <span className="text-red-500 text-sm">
                  {errors.assignmentDescription.message}
                </span>
              )}
            </div>
            <div className="text-center">
              <label className="text-gray-200 text-lg block mb-2">
                Assignment Description
              </label>

              <DatePicker
                className="p-2 rounded-lg"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn  bg-base-orange border-none text-lg text-white hover:bg-white hover:text-base-orange"
              >
                {loading ? (
                  <ImSpinner9 className="animate-spin text-2xl text-base-orange m-auto" />
                ) : (
                  "Add Assignment"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

AssignmentModal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  startDate: PropTypes.object,
  setStartDate: PropTypes.func,
};
export default AssignmentModal;
