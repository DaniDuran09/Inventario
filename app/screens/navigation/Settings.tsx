import { Text, View } from "react-native-ui-lib";
export default function Settings() {
  return (
    <View flex bg-white padding-20>
      <View row br100 bg-blue50>
        <View style={{width:70,height:70}} bg-black br100/>
        <View flex centerV marginL-20>
          <Text text50>HOLA </Text>
          <Text text30>Daniel</Text>
        </View>
      </View>
      <View  bg-grey50 br50>
        <Text text50 marginT-40  >NOMBRE:</Text>
        <Text text60>Daniel</Text>
        <Text text50 marginT-20 >TELEFONO</Text>
        <Text text60>7771234567</Text>
        <Text text50 marginT-20 >CORREO</Text>
        <Text text60>Daniel@gmail.com</Text>
        <Text text50 marginT-20 >CONTRASEÑA</Text>
        <Text text60>**********</Text>
      </View>
    </View>
  );
}
