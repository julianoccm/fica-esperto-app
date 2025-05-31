import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

export default class BillService {
  static async payBill(id: number): Promise<any> {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in AsyncStorage");
    }

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.put<any>(`/bill/v1/pay/${id}`);
    return response;
  }

  static async pendeciateBill(id: number): Promise<any> {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in AsyncStorage");
    }

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.put<any>(`/bill/v1/pending/${id}`);
    return response;
  }

  static async deleteBill(id: number): Promise<any> {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in AsyncStorage");
    }

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.delete<any>(`/bill/v1/delete/${id}`);
    return response;
  }
}
