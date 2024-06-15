import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  Products,
  removeItem,
  updateQuantity,
} from "./slice/ProductCart";
import { productApi } from "./middleware/ProductApi";
import stripe, { loadStripe } from "@stripe/stripe-js";

interface P extends Products {
  userId: number;
}

export interface CartInfoSendToBackend {
  userId: number;
  productId: number;
  colorName: string;
  colorValue: string;
  quantity: number;
  couponCode: string;
  discountAmount: number;
}
export const addItemToCartAndSaveToDB = createAsyncThunk(
  "cart/addToCartAndSaveToDB",
  async (cartItem: P, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        addToCart({
          product: cartItem.product,
          color: cartItem.color,
          quantity: cartItem.quantity,
        })
      );

      const response = await dispatch(
        productApi.endpoints.addCartItemToDB.initiate({
          productId: cartItem.product.product_id,
          quantity: cartItem.quantity,
          userId: cartItem.userId,
          colorName: cartItem.color.color_name,
          colorValue: cartItem.color.value,
        })
      ).unwrap();

      console.log("addItemToCartAndSaveToDB resposnse == ", response);
      return cartItem;
    } catch (error) {
      console.error(
        "Error adding product to cart and saving to database:",
        error
      );
      return rejectWithValue(error);
    }
  }
);
export const updateQuantityAndSaveToDB = createAsyncThunk(
  "cart/updateToCartAndSaveToDB",
  async (
    cartItem: {
      productId: number;
      color: { colorName: string; value: string };
      quantity: number;
      userId: number;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      // update redux store cart item
      dispatch(
        updateQuantity({
          productId: cartItem.productId,
          color: {
            colorName: cartItem.color.colorName,
            value: cartItem.color.value,
          },
          quantity: cartItem.quantity,
        })
      );

      // if item quantity is 0 them remove from cart list
      if (cartItem.quantity <= 0) {
        dispatch(
          removeItem({
            productId: cartItem.productId,
            color: {
              color_name: cartItem.color.colorName,
              value: cartItem.color.value,
            },
          })
        );

        const response = await dispatch(
          productApi.endpoints.removeCartItemToDB.initiate({
            productId: cartItem.productId,
            userId: cartItem.userId,
            colorName: cartItem.color.colorName,
            colorValue: cartItem.color.value,
          })
        ).unwrap();

        console.log("removeItemFromCartDB resposnse == ", response);
      }

      const response = await dispatch(
        productApi.endpoints.updateCartItemToDB.initiate({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          userId: cartItem.userId,
          colorName: cartItem.color.colorName,
          colorValue: cartItem.color.value,
        })
      ).unwrap();

      console.log("updateToCartAndSaveToDB resposnse == ", response);

      return cartItem;
    } catch (error) {
      console.error(
        "Error adding product to cart and saving to database:",
        error
      );
      return rejectWithValue(error);
    }
  }
);

export const removeItemFromCartDB = createAsyncThunk(
  "cart/removeItemFromCartDB",
  async (
    cartItem: {
      productId: number;
      colorName: string;
      colorValue: string;
      userId: number;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      // remove cart item from redux store
      dispatch(
        removeItem({
          productId: cartItem.productId,
          color: {
            color_name: cartItem.colorName,
            value: cartItem.colorValue,
          },
        })
      );

      // remove cart item from database
      const response = await dispatch(
        productApi.endpoints.removeCartItemToDB.initiate({
          productId: cartItem.productId,
          userId: cartItem.userId,
          colorName: cartItem.colorName,
          colorValue: cartItem.colorValue,
        })
      ).unwrap();

      console.log("removeItemFromCartDB resposnse == ", response);

      return cartItem;
    } catch (error) {
      console.error(
        "Error adding product to cart and saving to database:",
        error
      );
      return rejectWithValue(error);
    }
  }
);

export const checkoutCartDB = createAsyncThunk(
  "cart/checkoutCartDB",
  async (cartItems: CartInfoSendToBackend[], { dispatch, rejectWithValue }) => {
    try {
      const sessionId = await dispatch(
        productApi.endpoints.sendForPayments.initiate(cartItems)
      ).unwrap();

      console.log("====================================");
      console.log(sessionId);
      console.log("====================================");

      const publisableKey = await dispatch(
        productApi.endpoints.getPaymentKey.initiate()
      ).unwrap();
      const stripe = await loadStripe(publisableKey);

      stripe?.redirectToCheckout({ sessionId: sessionId });

      return cartItems;
    } catch (error) {
      console.error(
        "Error adding product to cart and saving to database:",
        error
      );
      return rejectWithValue(error);
    }
  }
);
