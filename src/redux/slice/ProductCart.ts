import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, productApi } from "../middleware/ProductApi";

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

export const syncCartList = createAsyncThunk(
  "ProductCart/syncCartList",
  async (userId: number, { dispatch, getState }) => {
    const state = getState() as { productCart: ProductsCartState };
    const localCartList = state.productCart.cartList;

    const { data: dbCartList } =
      (await dispatch(
        productApi.endpoints.getCartItemsByUserId.initiate(userId, {
          forceRefetch: true,
        })
      )) || [];

    const itemsToAddToLocal = dbCartList?.filter(
      (dbItem) =>
        !localCartList.some(
          (localItem) =>
            localItem.product.product_id === dbItem.product.product_id &&
            localItem.color.color_name === dbItem.color.color_name &&
            localItem.color.value === dbItem.color.value
        )
    );

    itemsToAddToLocal?.forEach((item) => dispatch(addToCart(item)));

    const itemsToAddToDB = localCartList.filter(
      (localItem) =>
        !dbCartList?.some(
          (dbItem) =>
            dbItem.product.product_id === localItem.product.product_id &&
            dbItem.color.color_name === localItem.color.color_name &&
            dbItem.color.value === localItem.color.value
        )
    );

    const addOrUpdateCartItem = productApi.endpoints.addCartItemToDB.initiate;

    for (const item of itemsToAddToDB) {
      await dispatch(
        addOrUpdateCartItem({
          userId: userId,
          productId: item.product.product_id,
          colorName: item.color.color_name,
          colorValue: item.color.value,
          quantity: item.quantity,
        })
      );
    }
  }
);
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
        if (quantity <= 0) {
          state.cartList = state.cartList.filter((p) => p !== item);
        }

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
