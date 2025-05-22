import { CameraView } from 'expo-camera';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';

export default function Product({closeModal,type}:any) {
  const texto = type === "AGREGAR PRODUCTO" ? "AGREGAR PRODUCTO" : "EDITAR PRODUCTO";
    return (
      <SafeAreaView style={{ flex: 1 }}>
<View center paddingT-50>
      <Text text40  >{texto}</Text>
      <TouchableOpacity
      
      style={{width:'80%',height:50}}
      marginT-20
      center
      bg-red10
      onPress={()=>closeModal()}
      >
        <Text white text50>CANCELAR</Text>
      </TouchableOpacity>
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
     </View>
      </SafeAreaView>
    
  );
}
