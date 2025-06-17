import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "./services";

export const checkTokenAndRedirect = async (
  navigation: any,
  redirectTo: string
): Promise<boolean> => {
  const accessToken = await AsyncStorage.getItem("accessToken");

  if (!accessToken) {
    navigation.replace("Login");
    return false;
  }

  try {
    const decoded: { exp: number } = jwtDecode(accessToken);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (!isExpired) {
      try {
        const response = await fetch(`${API_URL}/api/v1/me/products`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.status !== 401) {
          navigation.replace(redirectTo);
          return true;
        }
      } catch (err) {
        console.log("Network error:", err);
      }
    } else {
      console.log("Token has expired");
    }
  } catch (error) {
    console.log("Invalid token:", error);
  }

  await AsyncStorage.removeItem("accessToken");
  navigation.replace("Login");
  return false;
};

