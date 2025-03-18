import { Text, View } from "react-native-ui-lib";
import {Camera, CameraView, useCameraPermissions} from 'expo-camera'
import { FlatList, Linking, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import useCamera from "@/hooks/UseCamera";

export default function Scanner() {

  const { permission: cameraPermissions } = useCamera();
  const [data, setData] = useState([
    { id: '1', nombre: '', stock: '1', qr: '4501246965956' },
    { id: '2', nombre: 'PEPE', stock: '1', qr: '123456789' },
    { id: '3', nombre: 'PEPE2', stock: '1', qr: '450124696595' }
  ]);

  const [barCodeValue , setBarCodeValue] = useState<string | null>(null);
  if(!cameraPermissions?.granted){
    <TouchableOpacity
    onPress={() => Linking.openSettings()}
    >
      <Text>CONCEDER PERMISOS</Text>
    </TouchableOpacity>
  }
  return (

  <View flex padding-30 center bg-grey50>
    <Text text40 >ESCANEA EL PRODUCTO</Text>
    <CameraView
      style={{
        width:'100%',
        height:'30%'
      }}
      barcodeScannerSettings={{
        barcodeTypes:['aztec' , 'ean13' , 'ean8' , 'pdf417' , 'upc_e' , 'datamatrix' , 'code39' , 'code93' , 'itf14' , 'codabar' , 'code128' , 'upc_a']
      }}
      onBarcodeScanned={(result)=>{
        console.log(result.data)
        setBarCodeValue(result.data)
        setData(prevData => {
          if (prevData.some(item => item.qr === result.data)) {
            console.log('EL PRODUCTO YA EXISTE');
          }

          console.log('SI SE PUDO');
          return [...prevData, { id: String(prevData.length + 1), nombre: 'SI SE PUDO', stock: '100', qr: result.data }];
        });
      }}
    >
    </CameraView>
    <View center flex width={'100%'} marginT-20>
      <ScrollView style={{width:'100%',height:'100%'}}>
        <FlatList
        data={data}
        renderItem={({item})=>(
          <View>
            <Text>{item.nombre}</Text>
          </View>
        )}
        keyExtractor={(item) => item.qr}
        />
      </ScrollView>
    </View>
  </View>
  );
}

