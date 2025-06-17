/*{
  "barcode": "075068084154",
  "storeId": 0,
  "name": "string",
  "description": "string",
  "price": 0,
  "stock": 0,
  "category": "LlU49Hu8qfS9IdHNvIUVPN&ch0nb"
}
*/
import { CameraView } from "expo-camera";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { Barcode } from "expo-barcode-generator";
import { ScrollView, TextInput } from "react-native";
import {
  useCreateProductMutation,
  useGetProductByCodeQuery,
  useUpdateProductMutation,
} from "@/app/functions/services";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Product({ closeModal, type, codeProps }: any) {
  const [typeCode, setTypeCode] = useState(true);
  const [camCode, setCamCode] = useState(" ");
  const [code, setCode] = useState(" ");
  const [name, setName] = useState(" ");
  const [description, setDescription] = useState("no hay descripcion");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data, isLoading, error , refetch} = useGetProductByCodeQuery(codeProps);

  console.log("data:", data, "isLoading:", isLoading, "error:", error);
  //SOLO PARA CATEGORÍAS

  //FIN

  const handleCreate = async () => {
    try {
      const newProduct = {
        barcode: typeCode ? camCode : code,
        storeId: 1,
        name: name,
        description: description,
        price: price,
        stock: stock,
        category: "gmelWSwOhlshP 0mrYun7tDlFlmww",
      };
      await createProduct(newProduct).unwrap();
      console.log("Producto creado exitosamente");
      closeModal();
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };
  const handleUpdate = async () => {
    console.log("Entrando a handleUpdate");
    console.log({
      name,
      description,
      price,
      stock,
    });

    try {
      const body = {
        name,
        storeId: 1,
        description,
        price,
        stock,
        category: "gmelWSwOhlshP 0mrYun7tDlFlmww", 
      };

      await updateProduct({
        barcode: codeProps , 
        body,
      }).unwrap();

      console.log("Producto actualizado exitosamente");
      closeModal();
    } catch (error: any) {
      console.error("Error al actualizar producto:", error);
      if (error?.data) {
        console.log("Detalles del error:", error.data);
      }
    }
  };

useEffect(() => {
  if ( type === "EDITAR PRODUCTO") {
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

  const generate12DigitNumber = () => {
    return Math.floor(Math.random() * 9_000_000_000_000) + 1_000_000_000_000;
  };

  useEffect(() => {
    if (!typeCode) {
      const generatedCode = generate12DigitNumber().toString();
      setCode(generatedCode);
    }
  }, [typeCode]);

  const texto = type;

  console.log("Type actual:", type); // ¿Es "AGREGAR PRODUCTO" o no?
  console.log("handleCreate existe:", handleCreate);
  console.log("handleUpdate existe:", handleUpdate); // ¿Está definido?
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View centerH paddingT-50 bg-blue50 flex paddingB-20>
          <Text grey10 text40>
            {texto}
          </Text>
          <TouchableOpacity
            style={{ width: "80%", height: 40, backgroundColor: "#28303B" }}
            br20
            marginT-20
            center
            onPress={() => closeModal()}
          >
            <Text white text50>
              CANCELAR
            </Text>
          </TouchableOpacity>
          {type === "EDITAR PRODUCTO" ? (
            <View width="80%" centerH marginT-20>
              <Text grey10 text60 style={{ marginBottom: 5 }}>
                CÓDIGO DE BARRAS
              </Text>
              <Barcode
                value={codeProps}
                options={{ format: "CODE128", background: "white" }}
              />
            </View>
          ) : (
            <>
              <View row center marginT-20 style={{ gap: 20 }}>
                <TouchableOpacity
                  bg-grey10
                  center
                  br20
                  style={{ width: "40%", height: 40 }}
                  onPress={() => setTypeCode(true)}
                >
                  <Text white text50>
                    ESCANEAR
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  bg-grey10
                  center
                  br20
                  style={{ width: "40%", height: 40 }}
                  onPress={() => setTypeCode(false)}
                >
                  <Text white text60>
                    GENERAR CÓDIGO
                  </Text>
                  <Text white text60>
                    ALEATORIO
                  </Text>
                </TouchableOpacity>
              </View>

              {typeCode ? (
                <View width="80%" centerH paddingV-30>
                  <CameraView
                    style={{
                      width: "100%",
                      height: 200,
                    }}
                    barcodeScannerSettings={{
                      barcodeTypes: [
                        "ean13",
                        "ean8",
                        "code39",
                        "code128",
                        "qr",
                      ],
                    }}
                    onBarcodeScanned={(e) => {
                      setCamCode(e.data);
                      console.log(e.data);
                    }}
                  />
                  <View bg-grey10 width={"100%"} height={50} center>
                    <Text white text50>
                      {camCode}
                    </Text>
                  </View>
                </View>
              ) : (
                <View marginV-30 center style={{ width: "80%" }}>
                  <Barcode
                    value={code}
                    options={{ format: "CODE128", background: "white" }}
                  />
                </View>
              )}
            </>
          )}

          <View width="80%" centerH>
            <Text grey10 text60 style={{ marginBottom: 5 }}>
              Nombre
            </Text>
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "white",
                height: 45,
                paddingHorizontal: 15,
                borderRadius: 10,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
              placeholder="Nombre del producto"
              onChangeText={(text) => setName(text)}
              value={name}
            />

            <Text grey10 text60 style={{ marginBottom: 5 }}>
              Cantidad
            </Text>
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "white",
                height: 45,
                paddingHorizontal: 15,
                borderRadius: 10,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
              placeholder="Stock"
              keyboardType="numeric"
              onChangeText={(text) =>
                setStock(text === "" ? 0 : parseInt(text))
              }
              value={stock === 0 ? "" : stock.toString()}
            />

            <Text grey10 text60 style={{ marginBottom: 5 }}>
              Precio
            </Text>
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "white",
                height: 45,
                paddingHorizontal: 15,
                borderRadius: 10,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
              placeholder="Agrega un precio al producto"
              keyboardType="numeric"
              onChangeText={(text) =>
                setPrice(text === "" ? 0 : parseInt(text))
              }
              value={price === 0 ? "" : price.toString()}
            />

            <Text grey10 text60 style={{ marginBottom: 5 }}>
              Descripción
            </Text>
            <TextInput
              style={{
                width: "100%",
                backgroundColor: "white",
                height: 45,
                paddingHorizontal: 15,
                borderRadius: 10,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
              placeholder="Agrega una descripción corta"
              onChangeText={(text) => setDescription(text)}
              value={description}
            />
          </View>

          <TouchableOpacity
            style={{ width: "80%", height: 40, backgroundColor: "#3B82F6" }}
            br20
            marginT-20
            center
            onPress={type === "EDITAR PRODUCTO" ? handleUpdate : handleCreate}
          >
            <Text white text50>
              {type === "AGREGAR PRODUCTO" ? "AGREGAR" : "EDITAR"}
            </Text>
          </TouchableOpacity>
          {type === "EDITAR PRODUCTO" ? (
            <TouchableOpacity
              style={{ width: "80%", height: 40, backgroundColor: "#F87171" }}
              br20
              marginT-20
              center
              onPress={() => closeModal()}
            >
              <Text white text50>
                ELIMINAR PRODUCTO
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
