import { useDispatch, useSelector } from "react-redux";
import { Products } from "../redux/slice/ProductCart";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Product } from "../redux/middleware/ProductApi";

const useCartSlice = (
  product: Product,
  color: { color_name: string; value: string }
) => {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state: RootState) => state.ProductCart);
  const alreadyInCart = cartList.find(
    (cart) =>
      cart.product.product_id === product.product_id &&
      cart.color.color_name === color.color_name &&
      cart.color.value === color.value
  );

  let [productOption, setProductOption] = useState({
    color: { color_name: "", value: "" },
    quantity: 0,
  });

  useEffect(() => {
    // if (alreadyInCart) {
    //   setProductOption({
    //     color: alreadyInCart
    //       ? {
    //           color_name: alreadyInCart?.color.color_name,
    //           value: alreadyInCart?.color.value,
    //         }
    //       : { color_name: "", value: "" },
    //     quantity: alreadyInCart ? alreadyInCart?.quantity : 0,
    //   });
    // } else {
    //   setProductOption({
    //     color: {
    //       color_name: "",
    //       value: "",
    //     },
    //     quantity: 0,
    //   });
    // }
  }, [alreadyInCart]);

  return { productOption, setProductOption };
};

export default useCartSlice;
