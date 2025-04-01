import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, TextInput, TouchableOpacity } from "react-native";
import { Colors, Text, View } from "react-native-ui-lib";

export default function Login() {
  const heightScreen = Dimensions.get("screen").height;
  const widthScreen = Dimensions.get("screen").width;

  const navigation = useNavigation()

  return (
    <View flex centerH paddingT-100 bg-blue40>
      <View
        bg-white
        padding-30
        width={widthScreen - 50}
        height={heightScreen / 2}
        br50
      >
        <View center marginB-50>
          <Text text40>INICIA SESIÓN</Text>
        </View>
        <View flex centerH>
          <Text text50>CORREO</Text>
          <TextInput
            style={{
              borderColor: "black",
              borderWidth: 1,
              width: "100%",
              borderRadius: 10,
            }}
          />
          <Text text50 marginT-40>
            CONTRASEÑA
          </Text>
          <TextInput
            style={{
              borderColor: "black",
              borderWidth: 1,
              width: "100%",
              borderRadius: 10,
            }}
          />
          <TouchableOpacity
          onPress={()=>navigation.navigate('tabNab')}
            style={{
              backgroundColor: Colors.blue40,
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
    </View>
  );
}
