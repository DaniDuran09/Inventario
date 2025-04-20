import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, TextInput, TouchableOpacity } from "react-native";
import { Colors, Text, View } from "react-native-ui-lib";

export default function Login() {
  const heightScreen = Dimensions.get("window").height;
  const widthScreen = Dimensions.get("window").width;

  const navigation = useNavigation()

  return (
      <View
        bg-blue40
        padding-30
        flex
      >
        <View center marginT-100>
          <Text white text20>INICIA SESIÓN</Text>
        </View>
        <View flex>
          <TextInput
            style={{
              width: "100%",
              backgroundColor:'white',
              height:50,
              marginVertical:20,
            }}
            placeholder="Correo"

          />
          <TextInput
            style={{
              width: "100%",
              backgroundColor:'white',
              height:50,
            }}
          />
          <TouchableOpacity
          onPress={()=>navigation.navigate('tabNab')}
            style={{
              backgroundColor: '#28303B',
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
