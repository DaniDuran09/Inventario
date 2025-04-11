import { useGetAllProductsQuery } from "@/app/functions/services";
import { store } from "@/configureStore";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors, Text, View } from "react-native-ui-lib";
import { Provider } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import LottieView from "lottie-react-native";
import { Entypo } from "@expo/vector-icons";

function InventoryComponent() {
  const heightScreen = Dimensions.get("window").height;
  const widthScreen = Dimensions.get("window").width;

  const { data, error, isLoading } = useGetAllProductsQuery();

  if (isLoading) return <ActivityIndicator size="large" color={"#0000ff"} />;
  if (error)
    return (
      <View flex center >
        <LottieView
        style={{width:'100%',height:'40%'}}
        source={require("../../../assets/animations/errorNotFound.json")}
        autoPlay
        loop={true}
        />
        <Text text40 >HUBO UN ERROR</Text>
        <Text text70 >Intenta de nuevo mas tarde</Text>
      </View>
    );
  return (
    <View flex bg-white bg-grey50>
      <View style={{width:'100%',height:'auto'}} bg-blue40 paddingT-30 paddingH-10>
        <Text text50 white  >Inventario</Text>
        <View flex bg-red10>
          <Text>Hola</Text>
        </View>
      </View>
      <FlashList
        ListEmptyComponent={
          <View center width={widthScreen} height={heightScreen / 1.3}>
            <LottieView
              style={{ width: "100%", height: "40%" }}
              source={require("../../../assets/animations/Animation - 1742945285475.json")}
              autoPlay
              loop={true}
            />
            <Text text40> NO SE ENCONTRARON PRODUCTOS</Text>
            <Text text70>Comienza a agregar productos </Text>
          </View>
        }
        data={data}
        renderItem={({ item }) => (
          <View style={{ width: "95%", height: 80  }} marginT-10 bg-white row br50 marginH-10 >
            <View flex padding-10>
              <View flex centerV>
                <Text text50>{item.name}</Text>
              </View>
              <View flex centerV>
                <Text blue40 text60>
                  ${item.price}
                </Text>
              </View>
            </View>

            <View width={"40%"} centerH paddingT-10>
              <View flex />
              <Text flex>en stock {item.stock}</Text>
            </View>
            <View style={{ width: "20%" }} center>
              <TouchableOpacity
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <Text text60 white>
                  . . .
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
      >
        <Entypo name="add-to-list" size={30} color="white" />
      </TouchableOpacity>
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
