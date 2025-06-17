import { Text, View } from "react-native-ui-lib";
import { CameraView } from "expo-camera";
import {
  Alert,
  FlatList,
  Linking,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import useCamera from "@/hooks/UseCamera";
import {
  Products,
  useGetProductByCodeQuery,
  useCreateCartMutation,
} from "../../functions/services";
import { Provider } from "react-redux";
import { store } from "@/configureStore";
import { Ionicons } from "@expo/vector-icons";

function CartComponent() {
  const { permission: cameraPermissions } = useCamera();
  const [carData, setCarData] = useState<Products[]>([]);
  const [qrCode, setQrCode] = useState<string>("");
  const [lastScanned, setLastScanned] = useState<string | null>(null);

  const [createCart, { isLoading: isCreating }] = useCreateCartMutation();

  const { data, error, isLoading } = useGetProductByCodeQuery(qrCode, {
    skip: !qrCode,
  });

  useEffect(() => {
    if (data) {
      const alreadyInCart = carData.some((item) => item.barcode === data.qr);
      if (!alreadyInCart) {
        setCarData((prev) => [
          ...prev,
          {
            name: data.name,
            price: data.price,
            barcode: data.barcode,
            stock: data.stock,
            onCart: 1,
          },
        ]);
        console.log("Producto agregado:", data.qr);
      } else {
        console.log("Producto ya en el carrito:", data.qr);
      }
    }
  }, [data]);

  const handleSubmit = () => {
    if (carData.length === 0) {
      ToastAndroid.showWithGravity(
        "NO HAY PRODUCTOS EN EL CARRITO",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      Alert.alert("CONFIRMAR", "¿Deseas finalizar la compra?", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              const finalCar = carData.map(item=>({barcode:item.barcode,quantity: item.onCart}));
              console.log("Carrito final:", finalCar);
              const response = await createCart(finalCar).unwrap();
              console.log("Carrito creado:", response);
              ToastAndroid.showWithGravity(
                "Compra realizada con éxito",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              setCarData([]); // limpiar carrito
            } catch (err) {
              console.error("Error al crear el carrito:", err);
              ToastAndroid.showWithGravity(
                "Error al procesar la compra",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
            }
          },
        },
      ]);
    }
  };

  const handleQrScan = (scannedData: string) => {
    if (scannedData === lastScanned) return;

    setLastScanned(scannedData);
    setQrCode(scannedData);

    // Limpiar para permitir reescaneo del mismo código después de 5 segundos
    setTimeout(() => setLastScanned(null), 5000);
  };

  if (!cameraPermissions?.granted) {
    return (
      <TouchableOpacity onPress={() => Linking.openSettings()}>
        <Text>CONCEDER PERMISOS</Text>
      </TouchableOpacity>
    );
  }

  if (error) {
    console.log("ERROR:", error);
  }

  return (
    <View center flex bg-blue50>
      <CameraView
        style={{
          width: "98%",
          height: "35%",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          overflow: "hidden",
        }}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "code39", "code128", "qr"],
        }}
        onBarcodeScanned={({ data }) => {
          if (data?.length > 0) {
            handleQrScan(data);
          }
        }}
      />

      <ScrollView style={{ width: "100%", paddingHorizontal: 10 }}>
        <FlatList
          data={carData}
          keyExtractor={(item) => item.qr}
          renderItem={({ item }) => (
            <View bg-white marginV-5 padding-10 row br30 center>
              <Text flex text50>
                {item.name}
              </Text>
              <Text flex text60 blue50>
                ${item.price * item.onCart}
              </Text>
              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={() => {
                  setCarData((prev) => {
                    const updated = prev
                      .map((prod) =>
                        prod.barcode === item.barcode
                          ? { ...prod, onCart: prod.onCart - 1 }
                          : prod
                      )
                      .filter((prod) => prod.onCart > 0);
                    if (!updated.some((p) => p.barcode === item.barcode)) {
                      setLastScanned(null);
                    }

                    return updated;
                  });
                }}
              >
                <Text text50>-</Text>
              </TouchableOpacity>
              <Text text60>{item.onCart}</Text>
              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={() => {
                  setCarData((prev) =>
                    prev.map((prod) =>
                      prod.barcode === item.barcode
                        ? {
                            ...prod,
                            onCart: Math.min(prod.stock, prod.onCart + 1),
                          }
                        : prod
                    )
                  );
                }}
              >
                <Text text50>+</Text>
              </TouchableOpacity>
            </View>
          )}
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
        onPress={handleSubmit}
      >
        <Ionicons name="cash-outline" size={30} color={"white"} />
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
