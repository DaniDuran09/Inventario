import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Products {
  barcode: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}
export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

export const API_URL = "https://pos-app.duckdns.org";
//34.237.253.24
//documentaciòn
//http://localhost:8080/api/swagger-ui/index.html#/

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, { endpoint }) => {
      if (endpoint !== "loginUser") {
        const token = await AsyncStorage.getItem("accessToken");
        console.log("ENDPOINT :", endpoint);
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
          console.log("NO ES UN LOGIN", token);
        }
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getProductByCode: build.query<Products[], string>({
      query: (code) => `/api/v1/me/products/${code}`,
    }),
    getAllProducts: build.query<Products[], void>({
      query: () => "/api/v1/me/products",
    }),
    deleteProduct:build.mutation<void,string>({
      query:(barcode)=>({
        url:`/api/v1/me/products/${barcode}`,
        method:'DELETE',
      })
    }),
    getUserInfo: build.query<UserInfo[], void>({
      query: () => "/api/v1/users/me",
    }),
    getCarts: build.query({
      query: () => `/api/v1/me/carts`
    }),

    loginUser: build.mutation<
      { accessToken: string },
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: `/api/v1/auth/login`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: credentials,
      }),
    }),
    /*{
  "barcode": "075068084154",
  "storeId": 0,
  "name": "string",
  "description": "string",
  "price": 0,
  "stock": 0,
  "category": "LlU49Hu8qfS9IdHNvIUVPN&ch0nb"
}
*/ createProduct: build.mutation<
      void,
      {
        barcode: string;
        storeId: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        category: any;
      }
    >({
      query: (newProduct) => ({
        url: `/api/v1/me/products`,
        method: "POST",
        body: newProduct,
      }),
    }),
    updateProduct: build.mutation({
      query: ({ barcode, body }) => ({
        url: `/api/v1/me/products/${barcode}`,
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json", // Obligatorio
        },
      }),
    }),
    createCart: build.mutation({
  query: (batch) => ({
    url: `/api/v1/me/carts/batch`,
    method: "POST",
    body: batch,
  }),
}),


    /*createUser:build.mutation<void,{
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        email: string;
        phone: {
          countryCode: string;
          areaCode: string;
          subscriberNumber: string;
        };
        countryCode: string;
      }>({
        query:(newUser)=>({
          url:`/api/v1/managers`,
          method:'POST',
          body:newUser,
        })
      })*/
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByCodeQuery,
  useLoginUserMutation,
  useGetUserInfoQuery,
  useGetCartsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useCreateCartMutation,
  useDeleteProductMutation,
} = dataApi;
