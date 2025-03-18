import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Inventory from "../screens/inventory/inventory";
import edit from "../screens/inventory/edit";
import { Colors } from "react-native-ui-lib";

export default function MyStack () {
    
    const Stack = createNativeStackNavigator();
    return(
            <Stack.Navigator>
            <Stack.Screen name="inventory" component={Inventory} options={{title:'INVENTARIO',headerStyle:{backgroundColor:Colors.blue50}}} />
                <Stack.Screen name="edit" component={edit}  options={{title:'EDITAR PRODUCTO',headerStyle:{backgroundColor:Colors.blue50}}} />
            </Stack.Navigator>
    )
}