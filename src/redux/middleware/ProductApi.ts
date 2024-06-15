import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginFormField, RegFormField } from "../../pages/SignUpPage";

import { CartInfoSendToBackend, removeItemFromCartDB } from "../saveToDBThunk";
import { Products, removeItem } from "../slice/ProductCart";
import { loadStripe } from "@stripe/stripe-js";
import authService from "../../services/authService";

export type Product = {
  product_id: number;
  name: string;
  price: number;
  price_sign: string;
  brand: string;
  product_type: string;
  categorie: string;
  description: string;
  api_featured_image: string;
  stock: number;
};

type ProductColors = {
  hex_value: string;
  color_name: string;
};

export interface SingleProduct {
  product: Product;
  colors: ProductColors[];
  tags: string[];

  relatedProducts: Product[];
}

type AllProducts = {
  products: Product[];
  totalPages: number;
};

export type ProductQuery = {
  brand?: string;
  product_type?: string[];
  categorie?: string[];
  tag?: string[];
  minPrice?: number | null;
  maxPrice?: number | null;
  setSort?: string | null;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
};

type Coupon = {
  code: string;
};

type AddToDB = {
  userId: number;
  productId: number;
  quantity: number;
  colorName: string;
  colorValue: string;
};

export type OrderItems = {
  order_id: number;
  api_featured_image: string;
  name: string;
  quantity: number;
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
  color_name: string;
  color_value: string;
};
export interface Orders {
  orderId: number;
  orderPlacedDate: string;

  orderedItems: OrderItems[];
}

export interface Address {
  address_id?: number;
  address_line: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  userId: number;
  address_type?: "billing" | "shipping" | "both" | "none";
  is_default?: number;
}

type AddressType = {
  userId: number;
  address_id: number;
  type: string;
};

export const productApi = createApi({
  reducerPath: "ProductApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json, text/plain");

      const token = authService.getJsonWebToken();

      if (token) headers.set("x-auth-token", token);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNewProducts: builder.query<Product[], void>({
      query: () => "/products/new",
    }),

    getProduct: builder.query<SingleProduct, number>({
      query: (id: number) => `/products/${id}`,
    }),

    getAllProduct: builder.query<AllProducts, ProductQuery>({
      query: (productQuery: ProductQuery) => ({
        url: `/products`,
        params: productQuery,
      }),

      serializeQueryArgs: ({ queryArgs }) => {
        const { pageNumber, ...rest } = queryArgs;
        return rest;
      },

      merge: (currentCache, newItem) => {
        if (typeof newItem === "object" && Array.isArray(newItem.products)) {
          const existingProductIds = new Set(
            currentCache.products.map((p) => p.product_id)
          );
          const newProducts = newItem.products.filter(
            (p) => !existingProductIds.has(p.product_id)
          );
          currentCache.products.push(...newProducts);
        }
      },
    }),

    addUser: builder.mutation<string, RegFormField>({
      query: (user: RegFormField) => ({
        url: "/users",
        method: "POST",
        body: user,
        responseHandler: (response) => response.text(),
      }),
    }),

    getUser: builder.mutation<string, LoginFormField>({
      query: (user: LoginFormField) => ({
        url: "/auth",
        method: "POST",
        body: user,
        responseHandler: (response) => response.text(),
      }),
    }),

    useCoupon: builder.mutation<number, Coupon>({
      query: (coupon: Coupon) => ({
        url: "/validate-coupon",
        method: "POST",
        body: coupon,
        responseHandler: (response) => response.text(),
      }),
    }),

    getPaymentKey: builder.query<string, void>({
      query: () => ({
        url: "/create-checkout-session",
        method: "GET",
        responseHandler: (response) => response.text(),
      }),
    }),

    requestPaymentIntent: builder.mutation<string, void>({
      query: () => ({
        url: "/payment",
        method: "POST",
        body: {},
        responseHandler: (response) => response.text(),
      }),
    }),

    addCartItemToDB: builder.mutation<string, AddToDB>({
      query: (addToDB: AddToDB) => ({
        url: "/carts",
        method: "POST",
        body: addToDB,
        responseHandler: (response) => response.text(),
      }),
    }),

    updateCartItemToDB: builder.mutation<string, AddToDB>({
      query: (addToDB: AddToDB) => ({
        url: "/carts",
        method: "PATCH",
        body: addToDB,
        responseHandler: (response) => response.text(),
      }),
    }),

    removeCartItemToDB: builder.mutation<
      string,
      {
        userId: number;
        productId: number;
        colorName: string;
        colorValue: string;
      }
    >({
      query: (addToDB: {
        userId: number;
        productId: number;
        colorName: string;
        colorValue: string;
      }) => ({
        url: "/carts",
        method: "DELETE",
        body: addToDB,
        responseHandler: (response) => response.text(),
      }),
    }),

    sendForPayments: builder.mutation<string, CartInfoSendToBackend[]>({
      query: (products: CartInfoSendToBackend[]) => ({
        url: "/create-checkout-session",
        method: "POST",
        body: products,
        responseHandler: (response) => response.text(),
      }),

      // async onQueryStarted(products, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data: session } = await queryFulfilled;
      //     const pu = await dispatch(
      //       productApi.endpoints.getPaymentKey.initiate()
      //     ).unwrap();
      //     const stripe = await loadStripe(pu);

      //     // products.map(  (p) => {
      //     //     dispatch(
      //     //     removeItem({
      //     //       productId: p.productId,
      //     //       color: { color_name: p.colorName, value: p.colorValue },
      //     //     })
      //     //   );
      //     // });
      //   } catch (error) {}
      // },
    }),

    getOrdersByUserId: builder.query<Orders[], number>({
      query: (userId: number) => ({
        url: `/orders/${userId}`,
      }),
    }),

    getCartItemsByUserId: builder.query<Products[], number>({
      query: (userId: number) => ({
        url: `/carts/${userId}`,
      }),
    }),

    saveAddress: builder.mutation<string, Address>({
      query: (address: Address) => ({
        url: "/address",
        method: "POST",
        body: address,
        responseHandler: (response) => response.text(),
      }),
    }),

    getAllAddressesByUserId: builder.query<Address[], number>({
      query: (userId: number) => ({
        url: `/address/all/${userId}`,
      }),
    }),

    setAddressType: builder.mutation<string, AddressType>({
      query: (addressType: AddressType) => ({
        url: "/address/typeupdate",
        method: "PATCH",
        body: addressType,
      }),
    }),

    getSelectedAddressByUserId: builder.query<Address[], number>({
      query: (userId: number) => ({
        url: `/address/${userId}`,
      }),
    }),

    removeAddressById: builder.mutation<
      string,
      { userId: number; address_id: number }
    >({
      query: (info: { userId: number; address_id: number }) => ({
        url: "/address/delete",
        method: "DELETE",
        body: info,
      }),
    }),

    getAddressById: builder.query<
      Address[],
      { userId: number; address_id: number }
    >({
      query: (info: { userId: number; address_id: number }) => ({
        url: "/address",
        params: info,
      }),
    }),

    updateAddress: builder.mutation<string, Address>({
      query: (address: Address) => ({
        url: "/address/update",
        method: "PATCH",
        body: address,
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
});

export const {
  useGetNewProductsQuery,
  useGetProductQuery,
  useGetAllProductQuery,

  useAddUserMutation,
  useGetUserMutation,
  useUseCouponMutation,
  useGetPaymentKeyQuery,
  useRequestPaymentIntentMutation,
  useAddCartItemToDBMutation,
  useUpdateCartItemToDBMutation,
  useSendForPaymentsMutation,
  useGetOrdersByUserIdQuery,
  useRemoveCartItemToDBMutation,
  useGetCartItemsByUserIdQuery,
  useSaveAddressMutation,
  useGetAllAddressesByUserIdQuery,
  useSetAddressTypeMutation,
  useGetSelectedAddressByUserIdQuery,
  useRemoveAddressByIdMutation,
  useGetAddressByIdQuery,
  useUpdateAddressMutation,
} = productApi;
