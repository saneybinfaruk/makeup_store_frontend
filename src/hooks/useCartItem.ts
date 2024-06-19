import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Products } from "../redux/slice/ProductCart";
import { AppDispatch, RootState } from "../redux/store";
import {
  removeItemFromCartDB,
  updateQuantityAndSaveToDB,
} from "../redux/saveToDBThunk";
import useGetUser from "./useGetUser";

const useCartItem = (products: Products) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useGetUser();
  const { product, color } = products;
  const cartList = useSelector(
    (state: RootState) => state.ProductCart.cartList
  );
  const item = cartList.find(
    (c) =>
      c.product?.product_id == product?.product_id &&
      c.color?.color_name === color?.color_name &&
      c.color?.value === color?.value
  );

  let [itemQuantity, setItemQuantity] = useState(item ? item.quantity : 0);

  useEffect(() => {
    setItemQuantity(item ? item.quantity : 0);
  }, [item]);

  const updateQuantity = (value: number) => {
    setItemQuantity((itemQuantity += value));
    dispatch(
      updateQuantityAndSaveToDB({
        productId: product?.product_id,
        color: { colorName: color.color_name, value: color.value },
        quantity: itemQuantity,
        userId: user?.userId!,
      })
    );
    if (itemQuantity <= 0) {
      dispatch(
        removeItemFromCartDB({
          productId: product?.product_id,
          colorName: color.color_name,
          colorValue: color.value,
          userId: user?.userId!,
        })
      );
    }
  };

  const remove = () => {
    dispatch(
      removeItemFromCartDB({
        productId: product?.product_id,
        colorName: color?.color_name,
        colorValue: color?.value,
        userId: user?.userId!,
      })
    );
  };


  return { itemQuantity, updateQuantity, remove };
};

export default useCartItem;
