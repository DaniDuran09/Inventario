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
  baseQuery: fetchBaseQuery({ baseUrl:'http://192.168.106.195:8080/api/products' }),
  endpoints: (build) => ({
    getProductByCode: build.query<Products[], string>({
      query: (code) => `/${code}`,
    }),
    getAllProducts: build.query<Products[],void>({
      query: () => "?detail=2",
    })
  }),
})

export const { useGetAllProductsQuery , useGetProductByCodeQuery } = dataApi
