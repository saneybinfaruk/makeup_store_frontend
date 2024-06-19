import React, { useState } from "react";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Alert, AlertIcon, Button } from "@chakra-ui/react";

const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState("");
  const stripe = useStripe();

  const elements = useElements();

  const [showAlert, setShowAlert] = useState(false);

  const alert = () => {
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (result.error) {
    } else {
    }

    setIsProcessing(false);

    setSuccess(result.paymentIntent?.status as string);
    alert();
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {showAlert && (
        <Alert
          status={success === "succeeded" ? "success" : "error"}
          variant="subtle"
          my={2}
        >
          <AlertIcon />
          {success === "succeeded" ? "Payment Completed!" : "Payment Failed!"}
        </Alert>
      )}
      <Button
        colorScheme="red"
        my={3}
        type="submit"
        onClick={() => handleSubmit}
        isLoading={isProcessing}
        width={"100%"}
      >
        Pay
      </Button>
    </form>
  );
};

export default CheckoutForm;
