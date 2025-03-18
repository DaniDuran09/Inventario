import fetchData from "@/app/functions/services";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Colors, Text, View } from "react-native-ui-lib";

export default function Inventory() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiConection = async () => {
      try {
        const json = await fetchData();
        setData(json);
      } catch (error) {
        console.log("ERROR : ", error);
      } finally {
        setLoading(false);
      }
    };
    apiConection(); 
  }, []);

  return (
    <View paddingH-20 flex bg-white>
      {loading ? (
        <View>
          <Text>CARGANDO ...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              style={{ width: "100%", height: 100 }}
              marginT-10
              bg-grey50
              row
            >
              <View flex padding-10 >
                <View flex centerV>
                  <Text text60>{item.nombre}</Text>
                </View>
                <View flex centerV>
                  <Text blue40 text60>${item.precio}</Text>
                </View>
              </View>

              <View width={'40%'} centerH paddingT-10>
                <View flex/>
                <Text flex>en stock {item.stock}</Text>
              </View>
              <View style={{width:'20%'}} center>
                <TouchableOpacity style={{backgroundColor:Colors.blue30,width:'100%',height:'80%',justifyContent:'center',alignItems:'center'}}>
                  <Text text60 white>EDITAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}
