import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../middleware/ProductApi";

export interface Products {
  favorite: boolean;
  product: Product;
}

interface FavoriteProductsState {
  favoriteList: Products[];
}

const initialState: FavoriteProductsState = {
  favoriteList: [],
};

const FavoriteProduct = createSlice({
  name: "FavoriteProduct",
  initialState,
  reducers: {
    addToFavoriteList(
      state,
      action: PayloadAction<{ product: Product; favorite: boolean }>
    ) {
      const item = state.favoriteList.find(
        (f) => f.product.product_id === action.payload.product.product_id
      );

      if (item) {
        state.favoriteList = state.favoriteList.filter(
          (f) => f.product.product_id !== action.payload.product.product_id
        );
      } else {
        state.favoriteList.push(action.payload);
      }
    },
  },
});

export const { addToFavoriteList } = FavoriteProduct.actions;

export default FavoriteProduct.reducer;
