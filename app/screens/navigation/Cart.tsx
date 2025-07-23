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
import { useCallback, useEffect, useState } from "react";
import useCamera from "@/hooks/UseCamera";
import {
  Products,
  useGetProductByCodeQuery,
  useCreateCartMutation,
  useGetUserInfoQuery,
} from "../../functions/services";
import { Provider } from "react-redux";
import { store } from "@/configureStore";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

function CartComponent() {
  const { permission: cameraPermissions } = useCamera();
  const [carData, setCarData] = useState<Products[]>([]);
  const [qrCode, setQrCode] = useState<string>("");
  const [lastScanned, setLastScanned] = useState<string | null>(null);

  const [cameraActive, setCameraActive] = useState(true);
  const {
    data: dataInfo,
    isLoading: isLoadingInfo,
    error: errorInfo,
  } = useGetUserInfoQuery();

  useFocusEffect(
    useCallback(() => {
      setCameraActive(true); // reactivar cámara al entrar

      return () => {
        setCameraActive(false); // desactivar cámara al salir
      };
    }, [])
  );
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const [createCart, { isLoading: isCreating }] = useCreateCartMutation();
  const { data, error, isLoading } = useGetProductByCodeQuery(qrCode, {
    skip: !qrCode,
  });

  useEffect(() => {
    if (data) {
      setAlreadyInCart(carData.some((item) => item.barcode === data.qr));
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
              const finalCar = carData.map((item) => ({
                barcode: item.barcode,
                quantity: item.onCart,
              }));
              console.log("Carrito final:", finalCar);
              const response = await createCart(finalCar).unwrap();
              console.log("Carrito creado:", response);
              ToastAndroid.showWithGravity(
                "Compra realizada con éxito",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              setAlreadyInCart(false);
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
        <Text>CONCEDER </Text>
      </TouchableOpacity>
    );
  }

  if (error) {
    console.log("ERROR:", error);
  }
  if (dataInfo?.authorities?.includes("ROLE_MANAGER")) {
    return (
      <View flex center bg-blue50>
        <View
          center
          padding-30
          marginT-100
          bg-white
          width="90%"
          height="auto"
          br60
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 50,
            elevation: 6,
          }}
        >
          <Text text30 center style={{ color: "#D32F2F", fontWeight: "bold" }}>
            Acceso denegado
          </Text>

          <Text text70 center marginT-20 grey30>
            Por el momento, solo los empleados pueden realizar ventas. Cambia al
            rol de empleado para continuar.
          </Text>

          <Text text80 center marginT-20 style={{ color: "#D32F2F" }}>
            Estamos trabajando para habilitar esta función pronto.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View flex bg-blue50 center paddingT-30>
      {/* Cámara activa */}
      {cameraActive && (
        <CameraView
          style={{
            width: "96%",
            height: "36%",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            overflow: "hidden",
            marginTop: 10,
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
      )}

      {/* Lista de productos */}
      <ScrollView
        style={{ width: "100%", paddingHorizontal: 16, marginTop: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <FlatList
          data={carData}
          keyExtractor={(item) => item.qr}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                paddingVertical: 14,
                paddingHorizontal: 16,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              {/* Nombre y precio */}
              <View style={{ flex: 1 }}>
                <Text text50 style={{ fontWeight: "600", color: "#212121" }}>
                  {item.name}
                </Text>
                <Text text60 style={{ color: "#007AFF", marginTop: 4 }}>
                  ${item.price * item.onCart}
                </Text>
              </View>

              {/* Controles */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: "#F44336",
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 6,
                  }}
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
                        setAlreadyInCart(false);
                        setLastScanned(null);
                      }

                      return updated;
                    });
                  }}
                >
                  <Text white text60>
                    -
                  </Text>
                </TouchableOpacity>

                <Text text60 style={{ width: 24, textAlign: "center" }}>
                  {item.onCart}
                </Text>

                <TouchableOpacity
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: "#4CAF50",
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 6,
                  }}
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
                  <Text white text60>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
      {/* Total View */}
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 16,
          right: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Total */}
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
            marginRight: 12,
          }}
        >
          <Text text60 style={{ color: "#757575", fontWeight: "600" }}>
            Total:
          </Text>
          <Text text50 style={{ color: "#007AFF", fontWeight: "700" }}>
            $
            {carData
              .reduce((total, item) => total + item.price * item.onCart, 0)
              .toFixed(2)}
          </Text>
        </View>

        {/* Botón de vender */}
        <TouchableOpacity
          style={{
            backgroundColor: "#007AFF",
            borderRadius: 30,
            width: 60,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 6,
          }}
          onPress={handleSubmit}
        >
          <Ionicons name="cash-outline" size={28} color={"white"} />
        </TouchableOpacity>
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
