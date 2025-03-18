import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyStack from "./Navigation/myStack";
import { Colors } from "react-native-ui-lib";
import Scanner from "./screens/scanner";

export default function index() {
  const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator initialRouteName="scanner" >
        <Tab.Screen name="scanner" component={Scanner} options={{title:'ESCANER',headerStyle:{backgroundColor:Colors.blue50}}} />
        <Tab.Screen name="myStack" component={MyStack} options={{headerShown:false}} />
      </Tab.Navigator>
  );
}
