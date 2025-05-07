import AsyncStorage from "@react-native-async-storage/async-storage"
import {jwtDecode} from 'jwt-decode'

export const checkTokenAndRedirect = async (navigation:any,redirectTo:String) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if(accessToken){
        try {
            const decoded:{exp:number} = jwtDecode(accessToken)
            const isExpired = decoded * 1000 < Date.now()
                if(!isExpired){
                    navigation.navigate(redirectTo);
                }else{
                    await AsyncStorage.removeItem('accessToken')
                }
        } catch (error) {
            console.log(error)
            await AsyncStorage.removeItem('accessToken')
        }
    }
}