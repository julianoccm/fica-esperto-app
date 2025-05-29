import api from "../api/api";
import { AuthResponse } from "../models/auth-response";
import type { Login } from "../models/login";
import { User } from "../models/user";

export default class AuthService {
  static async login(payload: Login): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/v1/login", payload);
    return AuthResponse.fromJson(response.data);
  }
  
  static async register(payload: User): Promise<User> {
    const response = await api.post<String>("/auth/v1/register", payload);
    return User.fromJson(response.data);
  }
}
