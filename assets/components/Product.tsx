// ... (tus imports, no cambiaron)
import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { Barcode } from "expo-barcode-generator";
import { ScrollView, TextInput, Alert } from "react-native";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductByCodeQuery,
  useUpdateProductMutation,
} from "@/app/functions/services";

export default function Product({ closeModal, type, codeProps, role }: any) {
  const [typeCode, setTypeCode] = useState(true);
  const [camCode, setCamCode] = useState(" ");
  const [code, setCode] = useState(" ");
  const [name, setName] = useState(" ");
  const [description, setDescription] = useState("no hay descripcion");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [scanned, setScanned] = useState(false);

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { data, refetch } = useGetProductByCodeQuery(codeProps);

  // 👇 Valida código para evitar crash
  const isValidBarcode = (value: string) => {
    return (
      typeof value === "string" &&
      /^[\x00-\x7F]+$/.test(value) &&
      value.length > 0 &&
      value.length <= 80
    );
  };

  // 👇 Generador seguro para CODE128
  const generateValidCode128 = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleDelete = () => {
    Alert.alert("CONFIRMAR", "¿Deseas ELIMINAR el producto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Confirmar",
        onPress: async () => {
          try {
            await deleteProduct(codeProps).unwrap();
            closeModal();
          } catch (error) {
            console.log("error al eliminar el producto", error);
          }
        },
      },
    ]);
  };

  const handleCreate = async () => {
    try {
      const newProduct = {
        barcode: typeCode ? camCode : code,
        storeId: 1,
        name,
        description,
        price,
        stock,
        category: null,
      };
      await createProduct(newProduct).unwrap();
      closeModal();
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const body = {
        name,
        storeId: 1,
        description,
        price,
        stock,
        category: null,
      };
      await updateProduct({ barcode: codeProps, body }).unwrap();
      closeModal();
    } catch (error: any) {
      console.error("Error al actualizar producto:", error);
    }
  };

  useEffect(() => {
    if (type === "EDITAR PRODUCTO") {
      refetch();
    }
  }, [type]);

  useEffect(() => {
    if (type === "EDITAR PRODUCTO" && data) {
      setCode(data.barcode);
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setStock(data.stock);
    }
  }, [data, type]);

  useEffect(() => {
    if (!typeCode) {
      const generatedCode = generateValidCode128();
      setCode(generatedCode);
    }
  }, [typeCode]);

  const handleBarcodeScanned = (e: any) => {
    if (!scanned) {
      setCamCode(e.data);
      setScanned(true);
      setTimeout(() => setScanned(false), 3000);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View centerH paddingT-50 bg-blue50 flex paddingB-20>
          <Text grey10 text40>{type}</Text>

          <TouchableOpacity
            style={{ width: "80%", height: 40, backgroundColor: "#28303B" }}
            br20 marginT-20 center
            onPress={closeModal}
          >
            <Text white text50>CANCELAR</Text>
          </TouchableOpacity>

          {type === "EDITAR PRODUCTO" ? (
            <View width="80%" centerH marginT-20>
              <Text grey10 text60 style={{ marginBottom: 5 }}>
                CÓDIGO DE BARRAS
              </Text>
              {isValidBarcode(codeProps) ? (
                <Barcode
                  value={codeProps}
                  options={{ format: "CODE128", background: "white" }}
                />
              ) : (
                <Text red30>⚠️ Código de barras inválido</Text>
              )}
            </View>
          ) : (
            <>
              <View row center marginT-20 style={{ gap: 20 }}>
                <TouchableOpacity
                  bg-grey10 center br20
                  style={{ width: "40%", height: 40 }}
                  onPress={() => setTypeCode(true)}
                >
                  <Text white text50>ESCANEAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  bg-grey10 center br20
                  style={{ width: "40%", height: 40 }}
                  onPress={() => setTypeCode(false)}
                >
                  <Text white text60>GENERAR CÓDIGO</Text>
                  <Text white text60>ALEATORIO</Text>
                </TouchableOpacity>
              </View>

              {typeCode ? (
                <View width="80%" centerH paddingV-30>
                  <CameraView
                    style={{ width: "100%", height: 200 }}
                    barcodeScannerSettings={{
                      barcodeTypes: ["ean13", "ean8", "code39", "code128", "qr"],
                    }}
                    onBarcodeScanned={handleBarcodeScanned}
                  />
                  <View bg-grey10 width="100%" height={50} center>
                    <Text white text50>{camCode}</Text>
                  </View>
                </View>
              ) : (
                <View marginV-30 center style={{ width: "80%" }}>
                  {isValidBarcode(code) ? (
                    <Barcode
                      value={code}
                      options={{ format: "CODE128", background: "white" }}
                    />
                  ) : (
                    <Text red30>⚠️ Código de barras inválido</Text>
                  )}
                </View>
              )}
            </>
          )}

          <View width="80%" centerH>
            <Text grey10 text60 style={{ marginBottom: 5 }}>Nombre</Text>
            <TextInput
              style={{ width: "100%", backgroundColor: "white", height: 45, paddingHorizontal: 15, borderRadius: 10 }}
              placeholder="Nombre del producto"
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <Text grey10 text60 style={{ marginBottom: 5, marginTop: 10 }}>Cantidad</Text>
            <TextInput
              style={{ width: "100%", backgroundColor: "white", height: 45, paddingHorizontal: 15, borderRadius: 10 }}
              placeholder="Stock"
              value={stock === 0 ? "" : stock.toString()}
              onChangeText={(text) => setStock(text === "" ? 0 : parseInt(text))}
              keyboardType="numeric"
            />

            <Text grey10 text60 style={{ marginBottom: 5, marginTop: 10 }}>Precio</Text>
            <TextInput
              style={{ width: "100%", backgroundColor: "white", height: 45, paddingHorizontal: 15, borderRadius: 10 }}
              placeholder="Precio del producto"
              value={price === 0 ? "" : price.toString()}
              onChangeText={(text) => setPrice(text === "" ? 0 : parseInt(text))}
              keyboardType="numeric"
            />

            <Text grey10 text60 style={{ marginBottom: 5, marginTop: 10 }}>Descripción</Text>
            <TextInput
              style={{ width: "100%", backgroundColor: "white", height: 45, paddingHorizontal: 15, borderRadius: 10 }}
              placeholder="Descripción corta"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>

          {role === "MANAGER" && (
            <>
              <TouchableOpacity
                style={{ width: "80%", height: 40, backgroundColor: "#3B82F6" }}
                br20 marginT-20 center
                onPress={type === "EDITAR PRODUCTO" ? handleUpdate : handleCreate}
              >
                <Text white text50>
                  {type === "AGREGAR PRODUCTO" ? "AGREGAR" : "EDITAR"}
                </Text>
              </TouchableOpacity>

              {type === "EDITAR PRODUCTO" && (
                <TouchableOpacity
                  style={{ width: "80%", height: 40, backgroundColor: "#F87171" }}
                  br20 marginT-20 center
                  onPress={handleDelete}
                >
                  <Text white text50>ELIMINAR PRODUCTO</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
