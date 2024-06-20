import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./CheckoutForm.css";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";

const CheckoutForm = ({ classDataForEnroll, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  // const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  // const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (classDataForEnroll?.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: classDataForEnroll?.price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, classDataForEnroll]);

  const { mutateAsync: mutateEnrollClass } = useMutation({
    mutationFn: async (enrollmentInfo) => {
      const res = await axiosSecure.post("/enrolledClass", enrollmentInfo);
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        background: "#07332F",
        color: "#F2871D",
        text: `${error.message}`,
      });
    } else {
      console.log("Payment method", paymentMethod);
      // setError("");
    }
    const { paymentIntent, error: confirmCardError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user.email || "anonymous",
          },
        },
      });
    if (confirmCardError) {
      console.log("Confirmation related error", confirmCardError);
    } 
    // else {
    //   console.log("Payment Intent", paymentIntent);
    // }
    if (paymentIntent.status === "succeeded") {
      // console.log("TransactionId", paymentIntent.id);
      // setTransactionId(paymentIntent.id);
      const enrollmentInfo = {
        studentEmail: user?.email,
        studentName: user?.displayName,
        price: classDataForEnroll?.price,
        transactionId: paymentIntent.id,
        enrollDate: new Date().toDateString(),
        teacherName: classDataForEnroll?.teacherName,
        teacherEmail: classDataForEnroll?.teacherEmail,
        teacherImage: classDataForEnroll?.teacherImage,
        classTitle: classDataForEnroll?.classTitle,
        classDescription: classDataForEnroll?.classDescription,
        classImage: classDataForEnroll?.classImage,
        assignment: classDataForEnroll?.assignment,
        classId: classDataForEnroll?._id,
      };
      await mutateEnrollClass(enrollmentInfo, {
        onSuccess: (data) => {
          if (data.insertedId) {
            Swal.fire({
              title: "Payment Successfull",
              text: `Welcome!${user?.displayName}.You are successfully enroll the ${classDataForEnroll?.classTitle} class`,
              icon: "success",
              background: "#07332F",
              color: "#F2871D",
            });
            refetch();
            navigate("/dashboard/enrollClasses");
          }
        },
        onError: (error) => {
          console.log("Error in payment", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while payment for this class",
            icon: "error",
            background: "#07332F",
            color: "#F2871D",
          });
        },
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="border-2 shadow-lg p-4 rounded-lg"
          options={{
            style: {
              base: {
                fontSize: "18px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
                // backgroundColor:"#D1A054",
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn bg-base-orange text-white text-lg font-semibold w-full shadow-lg mt-8"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  classDataForEnroll: PropTypes.object,
  refetch: PropTypes.func,
};
export default CheckoutForm;
