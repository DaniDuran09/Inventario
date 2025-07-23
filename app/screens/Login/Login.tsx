import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import {
  Dimensions,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text, View } from "react-native-ui-lib";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkTokenAndRedirect } from "@/app/functions/authUtils";
import { store } from "@/configureStore";
import { useLoginUserMutation } from "@/app/functions/services";
import Ionicons from "react-native-vector-icons/Ionicons"; // ojo para mostrar/ocultar

function LoginComponent() {
  const heightScreen = Dimensions.get("window").height;
  const widthScreen = Dimensions.get("window").width;
  const navigation = useNavigation();
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Estados para errores y estilos
  const [errorUser, setErrorUser] = useState("");
  const [errorPass, setErrorPass] = useState("");

  const [loginUser, { data, error, isLoading }] = useLoginUserMutation();

  const handleLogin = async () => {
    setErrorUser("");
    setErrorPass("");

    if (userName == "" || password == "") {
      ToastAndroid.showWithGravity(
        "TODOS LOS CAMPOS SON OBLIGATORIOS",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }

    try {
      const result = await loginUser({
        username: userName,
        password: password,
      }).unwrap();
      console.log("accessToken : ", result);
      const { accessToken } = result;
      console.log(accessToken);
      await AsyncStorage.setItem("accessToken", accessToken);
      navigation.replace("tabNab");
    } catch (err: any) {
      console.log(err);

      // Validación personalizada para error 400 y mensajes específicos
      if (
        err?.data?.errors &&
        Array.isArray(err.data.errors) &&
        err.status === 400
      ) {
        Alert.alert("Error de validación", err.data.errors.join("\n"));

        // Asignar mensajes a inputs específicos
        err.data.errors.forEach((msg: string) => {
          if (msg.toLowerCase().includes("password")) {
            setErrorPass(msg);
          }
          if (msg.toLowerCase().includes("username")) {
            setErrorUser(msg);
          }
        });
      } else {
        ToastAndroid.showWithGravity(
          "Error al iniciar sesión",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      console.log(token, "token desde storage");
      const isValid = await checkTokenAndRedirect(token);
      console.log("isValid: ", isValid);
      if (isValid) {
        navigation.replace("tabNab");
      } else {
        console.log("Token inválido o expirado");
      }
    };

    checkToken();
  }, []);

  return (
    <View bg-blue50 padding-30 flex>
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
            marginVertical: 10,
            color: "black",
            borderWidth: errorUser ? 2 : 0,
            borderColor: errorUser ? "red" : "transparent",
            borderRadius: 8,
            paddingHorizontal: 12,
          }}
          placeholder="Correo"
          onChangeText={(texto) => setuserName(texto)}
          value={userName}
          autoCapitalize="none"
        />
        {!!errorUser && (
          <Text style={{ color: "red", marginBottom: 8 }}>{errorUser}</Text>
        )}

        <View style={{ position: "relative", width: "100%" }}>
          <TextInput
            style={{
              width: "100%",
              backgroundColor: "white",
              height: 50,
              color: "black",
              borderWidth: errorPass ? 2 : 0,
              borderColor: errorPass ? "red" : "transparent",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingRight: 40,
              marginBottom: 10,
            }}
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            onChangeText={(texto) => setPassword(texto)}
            value={password}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 10,
              top: 12,
              height: 26,
              width: 46,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setShowPassword((show) => !show)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={22}
              color="#555"
            />
          </TouchableOpacity>
        </View>
        {!!errorPass && (
          <Text style={{ color: "red", marginBottom: 8 }}>{errorPass}</Text>
        )}

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
