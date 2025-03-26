import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Products {
  barcode:string,
  name:string,
  description:string,
  price:number,	
  stock:number,
}

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({ baseUrl:'https://c6b9-2806-2f0-a320-f5bd-d42c-ec7-597c-67eb.ngrok-free.app/api' }),
  endpoints: (build) => ({
    getInventoryByCode: build.query<{name:string,stock:number,bar_code:string}, string>({
      query: (code) => `codeBar/${code}`,
    }),
    getAllProducts: build.query<Products[],void>({
      query: () => "/products?detail=2",
    })
  }),
})

export const { useGetAllProductsQuery , useGetInventoryByCodeQuery } = dataApi
