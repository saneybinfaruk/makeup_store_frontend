import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../middleware/ProductApi";

export interface Products {
  product: Product;
  quantity: number;
  color: { color_name: string; value: string };
}

interface CartSummary {
  totalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  couponCode: string;
}
interface ProductsCartState {
  cartList: Products[];
  filteredCartList: Products[];
  removedCartItems: Products[];
  productCartSummmary: CartSummary;
}

const initialState: ProductsCartState = {
  cartList: [],
  filteredCartList: [],
  removedCartItems: [],
  productCartSummmary: {
    totalPrice: 0,
    discountPercentage: 0,
    discountPrice: 0,
    couponCode: "",
  },
};

const ProductCart = createSlice({
  name: "ProductsCart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Products>) {
      const { product, color, quantity } = action.payload;

      const item = state.cartList.find(
        (p) =>
          p.product?.product_id === product?.product_id &&
          p.color.color_name === color.color_name &&
          p.color.value === color.value
      );

      if (item) {
        item.quantity = quantity;
      } else {
        state.cartList.push(action.payload);
        console.log(
          "=============== ProductCart addToCart ====================="
        );
        console.log(action.payload);
        console.log(
          "================ ProductCart cartList===================="
        );
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{
        productId: number;
        color: { colorName: string; value: string };
        quantity: number;
      }>
    ) {
      const { productId, color, quantity } = action.payload;
      const item = state.cartList.find(
        (p) =>
          p.product.product_id === productId &&
          p.color.color_name === color.colorName &&
          p.color.value === color.value
      );

      if (item) {
        item.quantity = quantity;
      }
    },
    increamentItemAmount(
      state,
      action: PayloadAction<{
        productId: number;
        color: { colorName: string; value: string };
        quantity: number;
      }>
    ) {
      const { productId, color } = action.payload;
      const item = state.cartList.find(
        (p) =>
          p.product.product_id === productId &&
          p.color.color_name === color.colorName &&
          p.color.value === color.value
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreamentItemAmount(
      state,
      action: PayloadAction<{
        productId: number;
        color: { colorName: string; value: string };
        quantity: number;
      }>
    ) {
      const { productId, color, quantity } = action.payload;
      const item = state.cartList.find(
        (p) =>
          p.product.product_id === productId &&
          p.color.color_name === color.colorName &&
          p.color.value === color.value
      );

      if (item) {
        item.quantity = quantity;
      }

      if (quantity <= 0) {
        if (!item) {
          console.log("item not found");
          return;
        }
        state.cartList = state.cartList.filter((p) => p !== item);
        console.log("====================================");
        console.log("Remove from the cart list");
        console.log("====================================");
      }
    },

    removeItem(
      state,
      action: PayloadAction<{
        productId: number;
        color: { color_name: string; value: string };
      }>
    ) {
      const item = state.cartList.find(
        (p) =>
          p.product?.product_id === action.payload.productId &&
          p.color?.color_name === action.payload.color.color_name &&
          p.color?.value === action.payload.color.value
      );

      if (item) {
        const itemIndex = state.cartList.indexOf(item);
        state.cartList.splice(itemIndex, 1);
        state.removedCartItems.push(item);
      }
    },

    cartItemToPayFor(state, action: PayloadAction<Products[]>) {
      state.filteredCartList = action.payload;
    },

    clearRemovedCartItemsList(state) {
      while (state.removedCartItems.length > 0) {
        state.removedCartItems.pop();
      }
    },

    updateProductCartSummary(state, action: PayloadAction<CartSummary>) {
      state.productCartSummmary = {
        ...state.productCartSummmary,
        ...action.payload,
      };
    },
  },
});

export const {
  addToCart,
  increamentItemAmount,
  decreamentItemAmount,
  removeItem,
  updateQuantity,
  cartItemToPayFor,
  clearRemovedCartItemsList,
  updateProductCartSummary,
} = ProductCart.actions;
export default ProductCart.reducer;
