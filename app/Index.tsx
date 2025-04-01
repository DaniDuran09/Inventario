import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './screens/Login/Login';
import TabNab from './Navigation/TabNab';

export default function Index() {
  
  const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='login'>
            <Stack.Screen
            options={{headerShown:false}}
            name='login' component={Login}
            />
            <Stack.Screen
            options={{headerShown:false}}
            name='tabNab' component={TabNab}
            />
        </Stack.Navigator>
        
    );
}
