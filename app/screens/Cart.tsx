import { Colors, Icon, Text, View } from "react-native-ui-lib";
import { CameraView } from "expo-camera";
import {
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import useCamera from "@/hooks/UseCamera";
import { useGetAllProductsQuery, useGetInventoryByCodeQuery } from "../functions/services";
import { Provider } from "react-redux";
import { store } from "@/configureStore";

function CartComponent() {
  const { permission: cameraPermissions } = useCamera();
  const [carData, setCarData] = useState([]);
  const { data: inventoryData } = useGetAllProductsQuery();

  if (!cameraPermissions?.granted) {
    return (
      <TouchableOpacity onPress={() => Linking.openSettings()}>
        <Text>CONCEDER PERMISOS</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View flex center>
      <CameraView
        style={{ width: "100%", height: "30%" }}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "code39", "code128",'qr'],
        }}
        onBarcodeScanned={(data)=> console.log(data.data)}
      />
      <ScrollView style={{ width: "100%" }}>
        <FlatList
          data={carData}
          renderItem={({ item }) => (
            <View bg-white marginV-5 padding-10 row br30 center>
              <Text flex text50>
                {item.name}
              </Text>
              <Text flex text60 blue40>
                ${item.price}
              </Text>
              <TouchableOpacity >
                <Text>-</Text>
              </TouchableOpacity>
              <Text text60>{item.onCart}</Text>
              <TouchableOpacity  >
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.qr}
        />
      </ScrollView>
      <View style={{ width: "110%", height: 50 }} bg-blue40 center>
        <Text text60 white>
          {//TOTAL: ${total
          }
        </Text>
      </View>
    </View>
  );
}

export default function Cart() {
  return (
    <Provider store={store}>
      <CartComponent />
    </Provider>
  );
}
