import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Products {
  barcode:string,
  name:string,
  description:string,
  price:number,	
  stock:number,
}
export interface UserInfo {
  id: number,
  firstName: string,
  lastName: string,
  username: string

}
//documentaciòn 
//http://localhost:8080/api/swagger-ui/index.html#/

  export const dataApi = createApi({
    reducerPath: 'dataApi',
    baseQuery: fetchBaseQuery({ baseUrl:'http://192.168.0.43:8080',prepareHeaders:async(headers,{endpoint})=>{
      if(endpoint !== 'loginUser'  ){
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
      getUserInfo:build.query<UserInfo[],void>({
        query: () => "/api/v1/managers/me?detail=2",
       }),
      loginUser:build.mutation<{accessToken:string},{username:string;password:string}>({
        query:(credentials)=>({
          url:`/api/v1/auth/login`,
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:credentials, 
        })
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
  })

export const { useGetAllProductsQuery , useGetProductByCodeQuery , useLoginUserMutation , useGetUserInfoQuery } = dataApi
