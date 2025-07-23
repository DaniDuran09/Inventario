import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "./services";
export const checkTokenAndRedirect = async (accessToken: string | null): Promise<boolean> => {
  console.log("si entra");
  //if (!accessToken) return false;
    const decoded: { exp: number } = jwtDecode(accessToken);
    const isExpired = decoded.exp * 1000 < Date.now();
    console.log(isExpired ,"isExpired");
  try {
    if (!isExpired) {
      const response = await fetch(`${API_URL}/api/v1/me/products`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status !== 401) {
        return true; // token válido
      }
    }
  } catch (err) {
    console.log("Error verificando token:", err);
  }

  await AsyncStorage.removeItem("accessToken");
  return false;
};

