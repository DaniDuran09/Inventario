import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const checkTokenAndRedirect = async (
  navigation: any,
  redirectTo: string
) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const decoded: { exp: number } = jwtDecode(accessToken);
      const isExpired = decoded.exp * 1000 < Date.now();
      if (!isExpired) {
        try {
          const response = await fetch(
            "http://192.168.0.43:8080/api/v1/me/products",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          if (response.status !== 401) {
            navigation.replace(redirectTo);
            return true;
          }
        } catch {
          console.log('error de red');
        }
      }
      await AsyncStorage.removeItem("accessToken");
      navigation.replace("Login");
      return false;
    } catch (error) {
      console.log(error);
      await AsyncStorage.removeItem("accessToken");
      navigation.replace("Login");
      return false;
    }
  } else {
    navigation.replace("Login");
    return false;
  }
};
