import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyStack from "./MyStack";
import { Colors } from "react-native-ui-lib";
import Cart from "../screens/navigation/Cart";
import Settings from "../screens/navigation/Settings";
import History from "../screens/navigation/History";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function TabNab() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="scanner" screenOptions={{
      tabBarStyle: {
        borderColor:'black',
        borderWidth:1,
        backgroundColor: Colors.white,
        height:'7%',
        paddingTop:10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }}    >
      <Tab.Screen
        name="scanner"
        component={Cart}
        options={{
          headerShown: false,
          title: "CARRITO",
          tabBarIcon: ({color})=> <FontAwesome  name="shopping-cart" color={color} size={30} />,
          tabBarActiveTintColor: Colors.blue40,
          tabBarInactiveTintColor:Colors.grey10
        }}
      />
      <Tab.Screen
        name="Historial"
        component={History}
        options={{ headerShown: false, title: "HISTORIAL",
        tabBarIcon: ({color})=> <FontAwesome  name="history" color={color} size={30} />,
        tabBarActiveTintColor: Colors.blue40,
        tabBarInactiveTintColor:Colors.grey10 }}
      />
      <Tab.Screen
        name="Inventario"
        component={MyStack}
        options={{ headerShown: false, title: "INVENTARIO" ,tabBarIcon: ({color})=> <FontAwesome  name="list" color={color} size={30} />,
        tabBarActiveTintColor: Colors.blue40,
        tabBarInactiveTintColor:Colors.grey10}} 
      />
      <Tab.Screen
        name="Perfil"
        component={Settings}
        options={{ headerShown: false, title: "CONFIGURACIÓN" ,tabBarIcon: ({color})=> <Ionicons  name="settings" color={color} size={30} />,
        tabBarActiveTintColor: Colors.blue40,
        tabBarInactiveTintColor:Colors.grey10}}
      />
    </Tab.Navigator>
  );
}
