import { CameraView } from "expo-camera";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import Barcode from 'react-native-barcode-builder'

export default function Product({ closeModal, type }: any) {
  const [typeCode, setTypeCode] = useState(true);
  const [code, setCode] = useState("");


  const texto =
    type === "AGREGAR PRODUCTO" ? "AGREGAR PRODUCTO" : "EDITAR PRODUCTO";

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <View centerH paddingT-50 bg-blue50 flex>
        <Text white text40>{texto}</Text>
        <TouchableOpacity
          style={{ width: "80%", height: 50 }}
          br20
          marginT-20
          center
          bg-red10
          onPress={() => closeModal()}
        >
          <Text white text50>
            CANCELAR
          </Text>
        </TouchableOpacity>
        <Text white text40>CÓDIGO DE BARRAS</Text>
        <View row center marginT-20 style={{ gap: 20 }}>
          <TouchableOpacity
            bg-grey10
            center
            br20
            style={{ width: "40%", height: 50 }}
            onPress={() => setTypeCode(true)}
          >
            <Text white text40>
              ESCANEAR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            bg-grey10
            center
            br20
            style={{ width: "40%", height: 50 }}
            onPress={() => setTypeCode(false)}
          >
            <Text white text40>
              GENERAR CÓDIGO
            </Text>
          </TouchableOpacity>
        </View>
        {typeCode ? (
          <CameraView
            style={{
              width: "80%",
              height: 200,
              marginTop: 20,
            }}
            barcodeScannerSettings={{
              barcodeTypes: ["ean13", "ean8", "code39", "code128", "qr"],
            }}
          />
        ) : (
          <View marginV-30 center style={{ width: "80%" }}>
            <Text text40>CÓDIGO GENERADO</Text>
            <Barcode
              value={'123456789012'}
              format="CODE128"
              width={2}
              height={100}
              background="#ffffff"
            />
          </View>
        )}
        // setCode(code.data);
      </View>
    </SafeAreaView>
  );
}
