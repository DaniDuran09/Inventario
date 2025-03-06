import { Tabs } from "expo-router";
import React from "react";

//ventas(index) , inventario , Historial , Configuración

export default function TabLayout(){
    return(
        <Tabs>
            <Tabs.Screen
                name="index"
            />
            <Tabs.Screen
                name="inventario"
            />
            <Tabs.Screen
                name="historial"
            />
            <Tabs.Screen
                name="settings"
            />
        </Tabs>
    )
}