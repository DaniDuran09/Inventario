import { useGetCartsQuery } from "@/app/functions/services";
import { store } from "@/configureStore";
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { FlatList } from "react-native";
import { Colors, Text, View } from "react-native-ui-lib";
import { Provider } from "react-redux";

function HistoryComponent() {
  const { data, error, isLoading,refetch } = useGetCartsQuery();
    const [refreshing , setRefreshing] = useState(false);

  useEffect(() => {
    console.log("son los carritos bro", data);
  }, [data]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <View padding-10 bg-blue50 flex paddingT-30>
      <FlatList
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={data || []}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No hay carritos todavía.</Text>}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              marginBottom: 12,
              backgroundColor: Colors.white,
              borderRadius: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text text60M>ID: #{item.id}</Text>
            <Text grey20>Fecha: {formatDate(item.createdOn)}</Text>
            <Text grey20>
              Empleado: {item.employee.firstName} {item.employee.lastName}
            </Text>
            <Text
              style={{
                color: item.state === "COMPLETED" ? "green" : "red",
                marginVertical: 4,
              }}
            >
              Estado: {item.state}
            </Text>
            <Text text70M>Total: ${item.total.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default function Settings() {
  return (
    <Provider store={store}>
      <HistoryComponent />
    </Provider>
  );
}

