import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  cartItemToPayFor,
  clearRemovedCartItemsList,
  Products,
  updateProductCartSummary,
} from "../redux/slice/ProductCart";
import { useEffect, useState } from "react";
import {
  useGetPaymentKeyQuery,
  useSendForPaymentsMutation,
} from "../redux/middleware/ProductApi";
import { loadStripe } from "@stripe/stripe-js";
import useGetUser from "./useGetUser";
import useSyncCartItemsToDB from "./useSyncCartItemsToDB";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const useCartSummary = (coupon: { code: string; discount: number }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItemsDBLoading } = useSyncCartItemsToDB();
  let { cartList } = useSelector((state: RootState) => state.ProductCart);
  let [filteredCartList, setFilterToCartList] = useState(cartList);
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const cartLength = cartList?.length;
  const filteredCartLength = filteredCartList.length;

  useEffect(() => {
    setFilterToCartList(cartList);
  }, [cartList]);

  const handleCheckBoxSelect =
    (products: Products) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setFilterToCartList([...cartList]);
      } else {
        let temp = [...filteredCartList].filter(
          (cartItem) =>
            !(
              cartItem.color.color_name === products.color.color_name &&
              cartItem.color.value === products.color.value &&
              cartItem.product.product_id === products.product.product_id
            )
        );

        setFilterToCartList([...temp]);
      }
    };

  const tPrice = filteredCartList
    .map((c) => c.product?.price * c.quantity)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  const totalPrice = parseFloat(tPrice);

  const discountedPrice = parseFloat(
    (totalPrice - (totalPrice * coupon?.discount!) / 100).toFixed(2)
  );

  const cartToSend = filteredCartList.map((f) => ({
    userId: user?.userId!,
    productId: f.product?.product_id,
    colorName: f.color?.color_name,
    colorValue: f.color?.value,
    quantity: f.quantity,
    discountAmount: coupon?.discount!,
    couponCode: coupon?.code!,
  }));

  const [sendForPayments, { isLoading: checkoutLoading, isSuccess }] =
    useSendForPaymentsMutation();
  const { data: publishableKey } = useGetPaymentKeyQuery();
  const sendPaymentRequest = async () => {
    // if (!user) {
    //   navigate("/signUp");
    //   return;
    // }
    try {
      const sessionId = await sendForPayments(cartToSend).unwrap();

      if (!publishableKey) return;
      const stripe = await loadStripe(publishableKey);
      dispatch(cartItemToPayFor(filteredCartList));
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {}
  };

  const goForPayment = async () => {
    dispatch(cartItemToPayFor(filteredCartList));
    dispatch(
      updateProductCartSummary({
        totalPrice: totalPrice,
        discountPercentage: coupon?.discount!,
        discountPrice: discountedPrice,
        couponCode: coupon?.code!,
      })
    );
    navigate("/checkout");
  };

  return {
    handleCheckBoxSelect,
    totalPrice,
    cartLength,
    cartList,
    discountedPrice,
    sendPaymentRequest,
    checkoutLoading,
    filteredCartLength,
    cartItemsDBLoading,
    goForPayment,
    isSuccess,
  };
};

export default useCartSummary;
