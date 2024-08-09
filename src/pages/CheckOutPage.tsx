import {
  Grid,
  GridItem,
  Text,
  HStack,
  VStack,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import SelectedAddress from "../component/SelectedAddress";
import ProductCheckoutLayout from "../component/ProductCheckoutLayout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useCartSummary from "../hooks/useCartSummary";
import useShakeAnimation from "../hooks/useShakeAnimation";
import useGetSelectedAddress from "../hooks/useGetSelectedAddress";

const CheckOutPage = () => {
  const { filteredCartList, productCartSummmary } = useSelector(
    (state: RootState) => state.ProductCart
  );

  const { totalPrice, discountPrice, discountPercentage, couponCode } =
    productCartSummmary;
  const { sendPaymentRequest, checkoutLoading, isSuccess } = useCartSummary({
    code: couponCode,
    discount: discountPercentage,
  });

  const { handleShake, isShaking, shakeAnimation } = useShakeAnimation();
  const { billing, shipping } = useGetSelectedAddress();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(1, 1fr)",
        md: "repeat(12, 1fr)",
        lg: "repeat(12, 1fr)",
        xl: "repeat(12, 1fr)",
        "2xl": "repeat(12, 1fr)",
      }}
      gap={1}
    >
      <GridItem colSpan={8} px={5} pb={5}>
        <SelectedAddress
          isShaking={isShaking}
          shakeAnimation={shakeAnimation}
        />

        {filteredCartList.map((products, index) => (
          <ProductCheckoutLayout key={index} products={products} />
        ))}
      </GridItem>

      <GridItem colSpan={4} mr={4}>
        <VStack
          align={"flex-start"}
          p={6}
          boxShadow={"base"}
          borderRadius={"10px"}
          gap={3}
        >
          <Text fontWeight={"600"} fontSize={"lg"}>
            Order Summary
          </Text>
          <HStack width={"100%"}>
            <Text fontSize={"md"}>Items Total</Text>
            <Spacer />
            <Text fontSize={"md"} fontWeight={"bold"}>
              ${totalPrice}
            </Text>
          </HStack>
          <HStack width={"100%"}>
            <Text>Discount</Text>
            <Spacer />
            <Text>{discountPercentage} %</Text>
          </HStack>
          <HStack width={"100%"}>
            <Text fontWeight={"500"}>Total Payment</Text>
            <Spacer />
            <Text fontWeight={"bold"}>${discountPrice}</Text>
          </HStack>

          <Button
            width={"full"}
            colorScheme="orange"
            my={3}
            isLoading={checkoutLoading || isSuccess}
            onClick={() => {
              if (
                (!shipping && billing) ||
                (shipping && !billing) ||
                (!shipping && !billing)
              ) {
                handleShake();
              } else {
                sendPaymentRequest();
                console.log("Go to payment");
              }
            }}
          >
            {"Place Order".toUpperCase()}
          </Button>
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default CheckOutPage;
