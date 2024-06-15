import { Flex, Heading } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import {
  useGetPaymentKeyQuery,
  useRequestPaymentIntentMutation,
} from "../redux/middleware/ProductApi";

const Payment = () => {
  const { data: paymentKey } = useGetPaymentKeyQuery();

  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  const [paymentIntent] = useRequestPaymentIntentMutation();
  const [clientSecret, setClientSecretKey] = useState("");

  const setSecretKey = async () => {
    try {
      const clientSecretKey = await paymentIntent().unwrap();
      setClientSecretKey(clientSecretKey);
    } catch (error) {}
  };

  useEffect(() => {
    if (paymentKey) {
      setStripePromise(loadStripe(paymentKey));
    }
  }, [paymentKey]);

  useEffect(() => {
    setSecretKey();
  }, []);

  return (
    <Flex flexDir={"column"} align={"center"} minH={"500px"}>
      <Heading>Strip</Heading>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </Flex>
  );
};

export default Payment;
