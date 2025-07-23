import { useCreateCartMutation, useGetAllProductsQuery, useGetProductByCodeQuery, useGetUserInfoQuery } from "@/app/functions/services";
import { store } from "@/configureStore";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Colors, Text, View } from "react-native-ui-lib";
import { Provider } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import LottieView from "lottie-react-native";
import { Entypo, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "@/assets/components/Product";
function InventoryComponent() {
  const [modal, setModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [type, setType] = useState(" ");
  const [codeProps, setCodeProps] = useState(" ");
  const [role, setRole] = useState(" ");

  const heightScreen = Dimensions.get("window").height;
  const widthScreen = Dimensions.get("window").width;

  const { data: dataInfo } = useGetUserInfoQuery();
  const { data, error, isLoading, refetch } = useGetAllProductsQuery();

  const closeModal = () => setModal(false);

  useEffect(() => {
    if (dataInfo?.authorities?.includes("ROLE_MANAGER")) {
      setRole("MANAGER");
    }
  }, [dataInfo]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, [modal]);

  useEffect(() => {
    console.log("DATA", data);
  }, [data]);

  useEffect(() => {
    console.log("codeProps", codeProps);
  }, [codeProps]);

  if (isLoading) return <ActivityIndicator size="large" color={"#0000ff"} />;

  if (error) {
    console.log(error);
    return (
      <View flex center>
        <LottieView
          style={{ width: "100%", height: "40%" }}
          source={require("../../../assets/animations/errorNotFound.json")}
          autoPlay
          loop
        />
        <Text text40>HUBO UN ERROR</Text>
        <Text text70>Intenta de nuevo más tarde</Text>
      </View>
    );
  }

  return (
    <View flex bg-white bg-blue50 paddingT-30 paddingH-20>
      <FlashList
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
  ListEmptyComponent={
    <View center width={widthScreen} height={heightScreen / 1.3}>
      <LottieView
        style={{ width: "100%", height: "40%" }}
        source={require("../../../assets/animations/Animation - 1742945285475.json")}
        autoPlay
        loop
      />
      <Text text40 style={{ fontWeight: "600", color: "#424242" }}>
        No se encontraron productos
      </Text>
      <Text text70 style={{ color: "#757575", marginTop: 8 }}>
        Comienza a agregar productos
      </Text>
    </View>
  }
  data={data}
  renderItem={({ item }) => (
    <View
      style={{
        width: "100%",
        minHeight: 100,
        padding: 16,
        marginVertical: 6,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 50,
        elevation: 6,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text text50 style={{ fontWeight: "600", color: "#212121" }}>
          {item.name}
        </Text>
        <Text text60 style={{ color: "#1976D2", marginTop: 4 }}>
          ${item.price}
        </Text>
        <Text
          text70
          style={{
            marginTop: 6,
            color:
              item.stock >= 10
                ? "#2E7D32"
                : item.stock >= 1
                ? "#F57C00"
                : "#D32F2F",
            fontWeight: "500",
          }}
        >
          En stock: {item.stock}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 12,
          backgroundColor: "#1976D2",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 12,
        }}
        onPress={() => {
          setModal(true);
          setType("EDITAR PRODUCTO");
          setCodeProps(item.barcode);
        }}
      >
        <Text text70 white style={{ fontWeight: "500" }}>
          {role === "MANAGER" ? "EDITAR" : "VER"}
        </Text>
      </TouchableOpacity>
    </View>
  )}
/>


      {role === "MANAGER" && (
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            width: 50,
            height: 50,
            backgroundColor: Colors.blue40,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setModal(true);
            setType("AGREGAR PRODUCTO");
          }}
        >
          <Entypo name="add-to-list" size={30} color="white" />
        </TouchableOpacity>
      )}

      <Modal visible={modal}>
        <Product closeModal={closeModal} type={type} codeProps={codeProps} role={role} />
      </Modal>
    </View>
  );
}


export default function Inventory() {
  return (
    <Provider store={store}>
      <InventoryComponent />
    </Provider>
  );
}
