import { useGetUserInfoQuery } from "@/app/functions/services";
import { store } from "@/configureStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Avatar, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { getInitials } from "react-native-ui-lib/src/helpers/AvatarHelper";
import { Provider } from "react-redux";

function SettingsComponent() {

  const {data , isLoading , error} = useGetUserInfoQuery();

  const navigation = useNavigation();

  useEffect(()=>{
    console.log(data);
  },[data])

/*
{"firstName": "Sandy", "id": 1, "lastName": "Torres", "username": "Sandy123"}
{"email": "sandy@gmail.com", "firstName": "Sandy", "id": 1, "lastName": "Torres", "phoneNumber": null, "username": "Sandy123"}
*/ 
  return (
    <View flex bg-white padding-20>
      <View row>
        <View flex centerV marginL-20 center>

          <Text text30>Hola {data?.firstName} </Text>
        </View>
      </View>
      <View>
        <View width={"100%"} height={1} bg-black marginT-20 />
        <Text text70 marginT-20>
          NOMBRE:
        </Text>
        <Text text60>{data?.firstName}</Text>
        <View width={"100%"} height={1} bg-black marginT-20 />
        <Text text70 marginT-20>
          APELLIDO:
        </Text>
        <Text text60>{data?.lastName}</Text>
        <View width={"100%"} height={1} bg-black marginT-20 />
        <Text text70 marginT-20>
          USUARIO:
        </Text>
        <Text text60>{data?.username}</Text>
        <View width={"100%"} height={1} bg-black marginT-20 />
        </View>
        <Text text70 marginT-20>
          CORREO:
        </Text>
        <Text text60>{data?.email}</Text>
        <View width={"100%"} height={1} bg-black marginT-20 />
        <TouchableOpacity height-100 center bg-red20 marginT-20 
          onPress={async () => {
            await AsyncStorage.removeItem("accessToken");
            navigation.replace("login");
          }}
        >
          <Text white text40>CERRAR SESIÓN</Text>
        </TouchableOpacity>
        
    </View>
  );
}

export default function Settings() {
  return (
    <Provider store={store}>
      <SettingsComponent />
    </Provider>
  );
}