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
  baseQuery: fetchBaseQuery({ baseUrl:'https://69bf-2806-2f0-a4e0-f594-5a6d-2e52-2bee-41e6.ngrok-free.app/api' }),
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
