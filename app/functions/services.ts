import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Products {
  barcode:string,
  name:string,
  description:string,
  price:number,	
  stock:number,
}

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({ baseUrl:'http://192.168.105.212:8080/api' }),
  endpoints: (build) => ({
    getProductByCode: build.query<Products[], string>({
      query: (code) => `/products/barcode/${code}`,
    }),
    getAllProducts: build.query<Products[],void>({
      query: () => "/products",
    })  
  }),
})

export const { useGetAllProductsQuery , useGetProductByCodeQuery } = dataApi
