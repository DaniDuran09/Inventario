/*El propósito de esta aplicación es ofrecer una solución móvil eficiente y accesible para la gestión
de ventas e inventario en una tienda. A través de una interfaz intuitiva, permite al usuario llevar 
el control de todos los productos disponibles, consultar su existencia y realizar ventas directamente
desde un dispositivo móvil. Una de sus funciones principales es el escaneo de códigos de barras
utilizando la cámara del celular, lo que facilita agregar productos al carrito de compra sin necesidad
de una computadora o un escáner físico. De esta manera, se agiliza el proceso de venta y se mejora la
movilidad y autonomía dentro del punto de venta*/

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "./screens/Login/Login";
import TabNab from "./Navigation/TabNab";

export default function Index() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name="login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false , gestureEnabled: false}}
        name="tabNab"
        component={TabNab}
      />
    </Stack.Navigator>
  );
}
