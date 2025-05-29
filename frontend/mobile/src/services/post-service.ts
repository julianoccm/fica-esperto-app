import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";
import { UserData } from "../models/user-data";
import { Post } from "../models/post";
import { User } from "../models/user";
import { getAgeGroup } from "../utils/date-utils";

export default class PostService {
  static async getUserPostsByCategory(): Promise<Post[]> {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in AsyncStorage");
    }

    const userStorage = await AsyncStorage.getItem("user");
    if(!userStorage) {
      throw new Error("No user found in AsyncStorage");
    }

    const user = User.fromJson(JSON.parse(userStorage));
    const category = getAgeGroup(user.birthDate!!)
    console.log(category)

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get<any[]>(`/post/v1/category/${category}`);
    const posts: Post[] = (response.data as any[]).map(postJson => Post.fromJson(postJson));
    return posts;
  }
}
