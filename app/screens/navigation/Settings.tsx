import { dataApi, useGetUserInfoQuery } from "@/app/functions/services";
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
    console.log("info del usuario",data);
  },[data])

/*
{"firstName": "Sandy", "id": 1, "lastName": "Torres", "username": "Sandy123"}
{"email": "sandy@gmail.com", "firstName": "Sandy", "id": 1, "lastName": "Torres", "phoneNumber": null, "username": "Sandy123"}
*/ return (
  <View flex bg-white padding-24>
    {/* Header */}
    <View row centerV marginB-24>
      <Text text30 style={{ fontWeight: "600", color: "#212121" }}>
        Hola, {data?.firstName}
      </Text>
    </View>

    {/* Info Cards */}
    <View style={{ gap: 16 }}>
      {/* Nombre */}
      <View>
        <Text text70 style={{ color: "#757575", marginBottom: 4 }}>
          Nombre:
        </Text>
        <Text text60 style={{ fontWeight: "500", color: "#212121" }}>
          {data?.firstName}
        </Text>
      </View>

      {/* Apellido */}
      <View>
        <Text text70 style={{ color: "#757575", marginBottom: 4 }}>
          Apellido:
        </Text>
        <Text text60 style={{ fontWeight: "500", color: "#212121" }}>
          {data?.lastName}
        </Text>
      </View>

      {/* Usuario */}
      <View>
        <Text text70 style={{ color: "#757575", marginBottom: 4 }}>
          Usuario:
        </Text>
        <Text text60 style={{ fontWeight: "500", color: "#212121" }}>
          {data?.username}
        </Text>
      </View>

      {/* Correo */}
      <View>
        <Text text70 style={{ color: "#757575", marginBottom: 4 }}>
          Correo:
        </Text>
        <Text text60 style={{ fontWeight: "500", color: "#212121" }}>
          {data?.email}
        </Text>
      </View>
    </View>

    {/* Divider */}
    <View height={1} bg-grey60 marginT-30 />

    {/* Botón de cerrar sesión */}
    <TouchableOpacity
      style={{
        marginTop: 32,
        backgroundColor: "#D32F2F",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
      }}
      onPress={async () => {
        await AsyncStorage.removeItem("accessToken");
        store.dispatch(dataApi.util.resetApiState());
        navigation.replace("login");
      }}
    >
      <Text text50 white style={{ fontWeight: "600" }}>
        Cerrar sesión
      </Text>
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