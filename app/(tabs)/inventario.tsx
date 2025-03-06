import { Text, View } from "react-native-ui-lib";
import { FlatList } from "react-native";

export default function Inventario() {

    const data = [
    {
      name: "Pegamento",
      price: 500,
      cantidad: 10,
      qr: "7 791293 025797",
    },
    {
      name: "Agua",
      price: 260,
      cantidad: 5,
      qr: "7 191294 015795",
    },
  ];

  return (
    <View bg-grey50 flex>
      <Text center marginB-10 bg-blue50 text10 >
        INVENTARIO
      </Text>
      <View padding-10 bg-purple50 center row style={{ width: 'auto', height: 50 }}>
        <Text text60 center flex>
          NOMBRE
        </Text>
        <Text text60 center flex>
          STOCK
        </Text>
        <Text text60 center flex>
          PRECIO
        </Text>
        <Text text60 center flex>
          OPCIONES
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <View style={{ width: "100%", height: 2 }}></View>
            <View padding-10 bg-white center row style={{ width:'auto', height: 100 }}>
              <Text text70 center flex>
                {item.name}
              </Text>
              <Text text70 center flex>
                {item.cantidad}
              </Text>
              <Text text70 center flex>
                ${item.price}
              </Text>
              <View center row flex style={{height:50}}>
                <View bg-blue50 center br100 style={{height:50,width:'100%'}}>
                  <Text>EDITAR</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.qr}
      />
    </View>
  );
}
