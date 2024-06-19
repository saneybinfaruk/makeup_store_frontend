import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductQueryState {
  product_type: string[];
  categories: string[];
  brands: string[];
  tags: string[];
  minPrice: number | null;
  maxPrice: number | null;
  setSort: string | null;
  showAmount: number | null;
  pageNumber: number;
  search: string;
}

const initialState: ProductQueryState = {
  product_type: [],
  categories: [],
  brands: [],
  tags: [],
  minPrice: null,
  maxPrice: null,
  setSort: "",
  showAmount: null,
  pageNumber: 1,
  search: "",
};

const ProductQuery = createSlice({
  name: "ProductQuery",
  initialState,

  reducers: {
    setProductType(state, action: PayloadAction<string[]>) {
      state.product_type = action.payload;
      state.pageNumber = 1;
    },
    setProductCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
      state.pageNumber = 1;
    },
    setProductBrand(state, action: PayloadAction<string[]>) {
      state.brands = action.payload;
      state.pageNumber = 1;
    },
    setProductsTag(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
      state.pageNumber = 1;
    },

    setMinPrice(state, action: PayloadAction<number | null>) {
      state.minPrice = action.payload;
      state.pageNumber = 1;
    },
    setMaxPrice(state, action: PayloadAction<number | null>) {
      state.maxPrice = action.payload;
      state.pageNumber = 1;
    },

    setSort(state, action: PayloadAction<string>) {
      state.setSort = action.payload;
      state.pageNumber = 1;
    },

    setShow(state, action: PayloadAction<number | null>) {
      state.showAmount = action.payload;
      state.pageNumber = 1;
    },

    setPageNumber(state, action: PayloadAction<number>) {
      state.pageNumber += action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const {
  setProductType,
  setProductCategories,
  setProductBrand,
  setProductsTag,
  setMinPrice,
  setMaxPrice,
  setSort,
  setShow,
  setPageNumber,
  setSearch,
} = ProductQuery.actions;
export default ProductQuery.reducer;
