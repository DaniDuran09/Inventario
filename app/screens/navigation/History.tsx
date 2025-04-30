import { FlatList } from "react-native";
import { Colors, Text, View } from "react-native-ui-lib";

export default function History() {
  const tickets = [
    {
      id: "1",
      fecha: "2025-04-10",
      productos: [
        { nombre: "Cuaderno A4", cantidad: 2, precio: 3.5 },
        { nombre: "Bolígrafo Azul", cantidad: 5, precio: 0.8 },
      ],
      total: 3.5 * 2 + 0.8 * 5,
    },
    {
      id: "2",
      fecha: "2025-04-09",
      productos: [
        { nombre: "Cartulina Blanca", cantidad: 10, precio: 0.6 },
        { nombre: "Tijeras Escolares", cantidad: 1, precio: 2.9 },
        { nombre: "Pritt Pequeño", cantidad: 3, precio: 1.2 },
      ],
      total: 0.6 * 10 + 2.9 + 1.2 * 3,
    },
    {
      id: "3",
      fecha: "2025-04-08",
      productos: [
        { nombre: "Lápiz HB", cantidad: 4, precio: 0.5 },
        { nombre: "Cuaderno de Dibujo", cantidad: 1, precio: 4.0 },
      ],
      total: 0.5 * 4 + 4.0,
    },
  ];

  return (
    <View padding-10>
    <FlatList
      data={tickets}
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
