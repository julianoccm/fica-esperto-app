import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";
import { Bill } from "../models/bill";
import { User } from "../models/user";

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

  static async createBill(bill: Bill): Promise<any> {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in AsyncStorage");
    }

    const userStorage = await AsyncStorage.getItem("user");
    if(!userStorage) {
      throw new Error("No user found in AsyncStorage");
    }

    const user = User.fromJson(JSON.parse(userStorage));
    bill.userId = user.id

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.post<any>(`/bill/v1/save`, bill);
    return Bill.fromJson(response.data);
  }
}
