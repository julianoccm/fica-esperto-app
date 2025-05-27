import api from "../api/api";
import type { Login } from "../models/login";

export const login = async (payload: Login): Promise<string> => {
  const response = await api.post<String>("/auth/v1/login", payload);
  return response.data.toString();
};
