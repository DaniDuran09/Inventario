import AsyncStorage from '@react-native-async-storage/async-storage';
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
    baseQuery: fetchBaseQuery({ baseUrl:'https://0da7-2806-2f0-a320-f5bd-695a-fba3-62ba-687b.ngrok-free.app',prepareHeaders:async(headers,{endpoint})=>{
      if(endpoint !== 'loginUser'){
        const token = await AsyncStorage.getItem('accessToken');
        console.log('ENDPOINT :',endpoint)
        if(token){
          headers.set('Authorization', `Bearer ${token}`)
          console.log('NO ES UN LOGIN',token)
        }
      }
      return headers
    }}),
    endpoints: (build) => ({
      getProductByCode: build.query<Products[], string>({
        query: (code) => `/api/v1/me/products/${code}`,

      }),
      getAllProducts: build.query<Products[],void>({
        query: () => "/api/v1/me/products",
        
      }),
      loginUser:build.mutation<{accessToken:string},{username:string;password:string}>({
        query:(credentials)=>({
          url:`/api/v1/auth/login`,
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:credentials, 
        })
      })  
    }),
  })

export const { useGetAllProductsQuery , useGetProductByCodeQuery , useLoginUserMutation} = dataApi
