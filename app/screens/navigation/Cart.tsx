import { Colors, Icon, Text, View } from "react-native-ui-lib";
import { CameraView } from "expo-camera";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import useCamera from "@/hooks/UseCamera";
import { Products, useGetAllProductsQuery,useGetProductByCodeQuery } from "../../functions/services";
import { Provider } from "react-redux";
import { store } from "@/configureStore";
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;


function CartComponent() {
  const { permission: cameraPermissions } = useCamera();
  const [carData, setCarData] = useState<Products[]>([]);
  const [qrCode, setQrCode] = useState<string>("");
  const [lastScanned, setLastScanned] = useState<string | null>(null);

  const { data, error, isLoading } = useGetProductByCodeQuery(qrCode, { skip: !qrCode });

  useEffect(() => {
    console.log('data : cardata',carData)
    if (data) {
      setCarData((prev) => [...prev,data]);
      console.log("Producto agregado:", carData);
    }
  }, [data]);

  if (isLoading) return <ActivityIndicator size="large" color={"#0000ff"} />;

  if (error) {
    console.log("ERROR : : :", error);
  }

  const handleQrScan = (scannedData: string) => {
    if (scannedData === lastScanned) return;
    setLastScanned(scannedData);
    setQrCode(scannedData);
  };

  if (!cameraPermissions?.granted) {
    return (
      <TouchableOpacity onPress={() => Linking.openSettings()}>
        <Text>CONCEDER PERMISOS</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View center flex bg-blue50>
      <CameraView
        style={{
          width: "100%",
          height: screenWidth < 600 ? "30%" : screenHeight * 0.5,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          overflow: "hidden",
        }}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "code39", "code128", "qr"],
        }}
        onBarcodeScanned={({ data }) => {
          if (data.length > 0) {
            handleQrScan(data);
          }
        }}
      />
  
      <ScrollView style={{ width: "100%", paddingHorizontal: 10 }}>
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
              <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                <Text text50>-</Text>
              </TouchableOpacity>
              <Text text60>{item.onCart}</Text>
              <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                <Text text50>+</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.qr}
        />
      </ScrollView>
  
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          backgroundColor: "#007AFF",
          borderRadius: 25,
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text text40 white>+</Text>
      </TouchableOpacity>
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
