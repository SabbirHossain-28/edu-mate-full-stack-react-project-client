import { GiCrossMark } from "react-icons/gi";
import PropTypes from "prop-types";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../CheckoutForm/CheckoutForm";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET_PK);

const PaymentModal = ({ handleModalClose, classDataForEnroll, refetch }) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: enrolledClassData = [] } = useQuery({
    queryKey: ["enrolledClassData", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClass/${user?.email}`);
      return res.data;
    },
  });
  if (
    enrolledClassData.find((data) => data.classId === classDataForEnroll._id)
  ) {
    Swal.fire({
      icon: "error",
      title: "Sorry!!",
      text: "You already enroll this class",
      background: "#07332F",
      color: "#F2871D",
    });
    handleModalClose();
  }
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-base-green bg-opacity-50">
        <div className="modal-box rounded bg-base-green  p-8">
          <div className="text-center text-base-orange mb-4">
            <h2 className="text-3xl font-poppin font-medium">
              Payment Here
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
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                classDataForEnroll={classDataForEnroll}
                refetch={refetch}
              ></CheckoutForm>
            </Elements>
          </div>
        </div>
      </div>
    </>
  );
};

PaymentModal.propTypes = {
  classDataForEnroll: PropTypes.object,
  handleModalClose: PropTypes.func,
  refetch: PropTypes.func,
};
export default PaymentModal;
