import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Inventory from "../screens/inventory/Inventory";
import edit from "../screens/inventory/Edit";
import { Colors } from "react-native-ui-lib";

export default function MyStack () {
    
    const Stack = createNativeStackNavigator();
    return(
            <Stack.Navigator>
            <Stack.Screen name="Inventario" component={Inventory} options={{headerShown:false}} />
                <Stack.Screen name="edit" component={edit}  options={{title:'EDITAR PRODUCTO',headerStyle:{backgroundColor:Colors.blue50}}} />
            </Stack.Navigator>
    )
}