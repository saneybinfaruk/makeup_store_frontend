import { useEffect } from "react";
import {
  productApi,
  useGetCartItemsByUserIdQuery,
} from "../redux/middleware/ProductApi";
import useGetUser from "./useGetUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addToCart, Products } from "../redux/slice/ProductCart";

let createReduxCartItemIdentifier = (item: Products): string => {
  return `${item.product?.product_id}-${item.product?.name}-${item.color?.color_name}-${item.color?.value}-${item.quantity}`;
};

let createDBCartItemIdentifier = (item: Products): string =>
  `${item.product?.product_id}-${item.product?.name}-${item.color?.color_name}-${item.color?.value}-${item.quantity}`;

const useSyncCartItemsToDB = () => {
  const user = useGetUser();
  const dispatch = useDispatch<AppDispatch>();

  // Ensure the hook is called with a default value
  const skipQuery = !user?.userId;

  // Use a stable query regardless of skip condition
  const { data: cartItemsOnDB, isLoading: cartItemsDBLoading } =
    useGetCartItemsByUserIdQuery(user?.userId!, {
      skip: skipQuery,
    });

  const { cartList, removedCartItems } = useSelector(
    (state: RootState) => state.ProductCart
  );

  useEffect(() => {
    if (!cartItemsDBLoading && cartItemsOnDB && user) {
      const currentCartListItems = new Set(
        cartList.map(createReduxCartItemIdentifier)
      );

      const removedListItems = new Set(
        removedCartItems.map(createReduxCartItemIdentifier)
      );

      const fetchedCartItemsIdentifiers = new Set(
        cartItemsOnDB.map(createDBCartItemIdentifier)
      );

      // Add missing items from DB to Redux store
      let missingItemsInStore = cartItemsOnDB.filter(
        (item) => !currentCartListItems.has(createDBCartItemIdentifier(item))
        // && !removedListItems.has(createDBCartItemIdentifier(item))
      );

      console.log("==============missingItemsInStore=====================");
      console.log(missingItemsInStore.map((v) => v));

      missingItemsInStore.forEach((item) => {
        dispatch(
          addToCart({
            product: item.product,
            color: {
              color_name: item.color?.color_name,
              value: item.color?.value,
            },
            quantity: item.quantity,
          })
        );
      });

      missingItemsInStore = [];

      // Add missing items from Redux store to DB (using await)
      let missingItemsInDB = cartList.filter(
        (item) =>
          !fetchedCartItemsIdentifiers.has(createReduxCartItemIdentifier(item))
      );

      missingItemsInDB.forEach(async (item) => {
        try {
          const response = await dispatch(
            productApi.endpoints.addCartItemToDB.initiate({
              productId: item.product.product_id,
              quantity: item.quantity,
              userId: user?.userId!,
              colorName: item.color.color_name,
              colorValue: item.color.value,
            })
          ).unwrap();

          console.log("addItemToCartAndSaveToDB response = ", response);
        } catch (error) {
          console.error("Failed to add item to DB:", error);
        }
      });

      removedListItems.clear();
      // dispatch(clearRemovedCartItemsList());
    }
  }, []);

  return { cartItemsDBLoading };
};

export default useSyncCartItemsToDB;
