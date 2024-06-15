import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { removeItem } from "../redux/slice/ProductCart";
import { removeItemFromCartDB } from "../redux/saveToDBThunk";
import useGetUser from "./useGetUser";

const useClearCartItems = () => {
  const [clearingState, setClearingState] = useState(false);
  const query = () => {
    const url = new URLSearchParams(useLocation().search);
    return url.get("payment_status");
  };

  const dispatch = useDispatch<AppDispatch>();
  const paymentStatus = query();
  const cartList = useSelector(
    (state: RootState) => state.ProductCart.cartList
  );
  const filteredCartList = useSelector(
    (state: RootState) => state.ProductCart.filteredCartList
  );
  const user = useGetUser();

  useEffect(() => {
    if (user) {
      if (paymentStatus && paymentStatus === "success") {
        setClearingState(true);
        cartList.map((c) => {
          const item = filteredCartList.find(
            (f) =>
              f.product.product_id === c.product.product_id &&
              f.color.color_name === c.color.color_name &&
              f.color.value === c.color.value
          );

          if (item) {
            dispatch(
              removeItemFromCartDB({
                productId: item.product.product_id,
                colorName: item.color.color_name,
                colorValue: item.color.value,
                userId: user?.userId!,
              })
            );
          }
        });

        setClearingState(false);
      }
    }
  }, [user]);

  return { clearingState };
};

export default useClearCartItems;
