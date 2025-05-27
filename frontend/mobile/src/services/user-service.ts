import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";
import { UserData } from "../models/user-data";

export default class UserService {
  static async getUserDataById(userId: number): Promise<UserData> {

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in AsyncStorage");
    }
    
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get<String>(`/user/v1/${userId}`);
    return UserData.fromJson(response.data);
  }
}
