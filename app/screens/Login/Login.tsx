import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import {
  Dimensions,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native-ui-lib";
import { Provider } from "react-redux";
import AsyncStorage  from '@react-native-async-storage/async-storage'
import { checkTokenAndRedirect } from "@/app/functions/authUtils";
import { store } from "@/configureStore";

function LoginComponent() {
  const heightScreen = Dimensions.get("window").height;
  const widthScreen = Dimensions.get("window").width;

  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { data, error, isLoading }] = useLoginUserMutation();

  const handleLogin = async () => {
    if (userName == "" || password == "") {
      ToastAndroid.showWithGravity(
        "TODOS LOS CAMPOS SON OBLIGATORIOS",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
      
      
    } else {
      try {
        const result = await loginUser({ username : userName, password:password }).unwrap();
        console.log("accessToken : ", result);
        const {accessToken} = result;
        console.log(accessToken)
       await AsyncStorage.setItem('accessToken',accessToken)
      navigation.navigate("tabNab");
      } catch (err) {
        console.log(err);
      }
    }
    else{
      navigation.navigate('tabNab')
    }
  }

  const navigation = useNavigation()



  useEffect (()=>{
    console.log('SE EJECUTA')
    checkTokenAndRedirect(navigation,'tabNab')
  },[])


  return (
    <View bg-blue40 padding-30 flex>
      <View center marginT-100>
        <Text white text20>
          INICIA SESIÓN
        </Text>
      </View>
      <View flex>
        <TextInput
          style={{
            width: "100%",
            backgroundColor: "white",
            height: 50,
            marginVertical: 20,
          }}
          placeholder="Correo"
          onChangeText={(texto) => setuserName(texto)}
        />
        <TextInput
          style={{
            width: "100%",
            backgroundColor: "white",
            height: 50,
          }}
          placeholder="Contraseña"
          secureTextEntry={false}
          onChangeText={(texto) => setPassword(texto)}
        />

        <TouchableOpacity
          onPress={() => handleLogin()}
          style={{
            backgroundColor: "#28303B",
            marginVertical: 50,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            borderRadius: 10,
          }}
        >
          <Text white text40>
            INICIAR SESION
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Login() {
  return (
    <Provider store={store}>
      <LoginComponent />
    </Provider>
  );
}
