import { useGetAllProductsQuery, useGetProductByCodeQuery } from "@/app/functions/services";
import { store } from "@/configureStore";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors, Modal, Text, View } from "react-native-ui-lib";
import { Provider } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import LottieView from "lottie-react-native";
import { Entypo, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";

function InventoryComponent() {
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState(''); 
  const [search , setSearch] = useState(false)

  const heightScreen = Dimensions.get("window").height;
  const widthScreen = Dimensions.get("window").width;

  const navigation = useNavigation();

  const { data, error, isLoading } = useGetAllProductsQuery();
  //const {  data, error, isLoading  } = useGetProductByCodeQuery(product,{skip:!product})

  useEffect(()=>{
    console.log('DATA',data)
  },[data])
  /*

  useEffect(()=>{
    
  },[search])
*/
  /*const data2 = [
    { name: "Hola1", price: 5, stock: 5, color: "green" },
    { name: "Hola2", price: 5, stock: 5, color: "yellow" },
    { name: "Hola3", price: 5, stock: 5, color: "red" },
  ];*/

  if (isLoading) return <ActivityIndicator size="large" color={"#0000ff"} />;

  if (error) {
    console.log(error);
    return (
      <View flex center>
        <LottieView
          style={{ width: "100%", height: "40%" }}
          source={require("../../../assets/animations/errorNotFound.json")}
          autoPlay
          loop={true}
        />
        <Text text40>HUBO UN ERROR</Text>
        <Text text70>Intenta de nuevo mas tarde</Text>
      </View>
    );
  }
  return (
    <View flex bg-white bg-grey50>
      <View
        style={{ width: "100%" }}
        bg-blue40
        paddingV-15
        paddingH-10
        marginB-5
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
          }}
          row
        >
          <TextInput
            style={{
              height: 40,
              fontSize: 16,
              color: "#000",
              paddingHorizontal: 10,
              flex: 1,
            }}
            placeholder="BUSCAR ..."
            placeholderTextColor="#999"
            onChangeText={(text)=> search? '' : setProduct(text)}
          />
          <TouchableOpacity
          onPress={()=>setSearch(true)}
          >
            <Octicons
              name="search"
              size={30}
              color="grey"
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
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
          <View
            style={{ width: "95%", height: 80 }}
            marginV-5
            bg-white
            row
            br50
            marginH-10
          >
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
              {/*<View
                style={{ backgroundColor: item.color }}
                width={50}
                height={50}
                br100
              />*/}
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
        onPress={() => setModal(true)}
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
