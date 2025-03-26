import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyStack from "./Navigation/myStack";
import { Colors } from "react-native-ui-lib";
import Cart from "./screens/Cart";
import Settings from "./screens/Settings";
import History from "./screens/History";
import { FontAwesome } from "@expo/vector-icons";

export default function index() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="scanner">
      <Tab.Screen
        name="scanner"
        component={Cart}
        options={{
          headerShown: false,
          title: "CARRITO",
          tabBarIcon: ({color})=> <FontAwesome  name="shopping-cart" color={color} size={30} />,
          tabBarActiveTintColor: Colors.blue40,
        }}
      />
      <Tab.Screen
        name="Historial"
        component={History}
        options={{ headerShown: false, title: "HISTORIAL" }}
      />
      <Tab.Screen
        name="Inventario"
        component={MyStack}
        options={{ headerShown: false, title: "INVENTARIO" }}
      />
      <Tab.Screen
        name="Perfil"
        component={Settings}
        options={{ headerShown: false, title: "CONFIGURACIÓN" }}
      />
    </Tab.Navigator>
  );
}
