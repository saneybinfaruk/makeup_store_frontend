import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "./middleware/ProductApi";
import ProductCart from "./slice/ProductCart";
import ProductQuery from "./slice/ProductQuery";
import FavoriteProduct from "./slice/FavoriteProduct";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "makeup-store-frontend",
  storage,
  whitelist: ["ProductCart", "FavoriteProducts"],
};

const reducers = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  ProductQuery: ProductQuery,
  ProductCart: ProductCart,
  FavoriteProducts: FavoriteProduct,
});

const persistReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistReducers,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      productApi.middleware
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
