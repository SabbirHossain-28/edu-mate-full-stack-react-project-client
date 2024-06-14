import { GiCrossMark } from "react-icons/gi";
import { ImSpinner9 } from "react-icons/im";
import PropTypes from "prop-types";

const TERModal = ({
  handleModalClose,
  handleSubmit,
  onSubmit,
  register,
  errors,
  loading,
  setUserRating,
  userRating,
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="text-center">
              <label className="text-gray-200 text-lg block mb-2">
                Your Feedback
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your feedback here"
                {...register("feedback", {
                  required: "Feedbaxk Description is required",
                })}
              />
              {errors.feedback && (
                <span className="text-red-500 text-sm">
                  {errors.feedback.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-center">
                <p className="text-gray-200 text-lg mb-2">Send Rating</p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => setUserRating(star)}
                    className="w-7 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="#94a3b8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                      fill={star <= userRating ? "#f2b00a" : "#94a3b8"}
                    />
                  </svg>
                ))}
                
              </div >
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="btn  bg-base-orange border-none text-lg text-white hover:bg-white hover:text-base-orange"
              >
                {loading ? (
                  <ImSpinner9 className="animate-spin text-2xl text-base-orange m-auto" />
                ) : (
                  "Send Feedback"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

TERModal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  userRating:PropTypes.number,
  setUserRating:PropTypes.func,
};
export default TERModal;