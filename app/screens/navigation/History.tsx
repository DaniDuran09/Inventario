import { useGetCartsQuery } from "@/app/functions/services";
import { FlatList } from "react-native";
import { Colors, Text, View } from "react-native-ui-lib";

export default function History() {
 
  const { data, error, isLoading } = useGetCartsQuery();

  return (
    <View padding-10 bg-blue50 flex>
    <FlatList
      data={[]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{
            padding: 10,
            marginBottom: 10,
            backgroundColor: Colors.white,
            borderRadius: 10,
          }}
        >
          <Text text60>{item.fecha}</Text>
          <Text style={{ marginTop: 5 }}>Productos:</Text>
          {item.productos.map((prod, index) => (
            <Text key={index}>
              - {prod.nombre} x{prod.cantidad} ${prod.precio.toFixed(2)}
            </Text>
          ))}
          <Text text70>
            Total: ${item.total.toFixed(2)}
          </Text>
        </View>
      )}
    />

    </View>
  );
}
