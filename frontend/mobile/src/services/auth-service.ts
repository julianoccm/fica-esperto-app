import api from "../api/api";
import type { Login } from "../models/login";
import { User } from "../models/user";

export default class AuthService {
  static async login(payload: Login): Promise<string> {
    const response = await api.post<String>("/auth/v1/login", payload);
    return response.data.toString();
  }
  
  static async register(payload: User): Promise<User> {
    const response = await api.post<String>("/auth/v1/register", payload);
    return User.fromJson(response.data);
  }
}
