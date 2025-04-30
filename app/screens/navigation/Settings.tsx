import { Avatar, Text, View } from "react-native-ui-lib";
import { getInitials } from "react-native-ui-lib/src/helpers/AvatarHelper";

export default function Settings() {

  return (
    <View flex bg-white padding-20>
      <View row>
        <View flex centerV marginL-20 center>

          <Text text30>Daniel</Text>
        </View>
      </View>
      <View>
        <View width={"100%"} height={1} bg-black marginT-20 />
        <Text text70 marginT-20>
          NOMBRE:
        </Text>
        <Text text60>Daniel</Text>
        <View width={"100%"} height={1} bg-black marginT-20 />
        <Text text70 marginT-20>
          TELEFONO
        </Text>
        <Text text60>7771234567</Text>
        <View width={"100%"} height={1} bg-black marginT-20 />
        <Text text70 marginT-20>
          CORREO
        </Text>
        <Text text60>Daniel@gmail.com</Text>
        <View width={"100%"} height={1} bg-black marginT-20 />
        <Text text70 marginT-20>
          CONTRASEÑA
        </Text>
        <Text text60>**********</Text>
        <View width={"100%"} height={1} bg-black marginT-20 />
      </View>
    </View>
  );
}
