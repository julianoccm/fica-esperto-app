import { useNavigation, type NavigationProp } from "@react-navigation/native";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";
import type { Post } from "../models/post";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();
  const { width } = Dimensions.get("window");

  return (
    <TouchableOpacity
      style={[styles.postCard, { width: width * 0.8 }]}
      onPress={() => navigation.navigate("Post", { id: post.id })}
    >
      <Text style={styles.postCardTitle}>{post.title}</Text>
      <Text style={styles.postCardDescription}>{post.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: "#FFF",
    height: 200,
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  postCardTitle: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 10,
  },
  postCardDescription: {
    color: "#000",
    fontSize: 14,
  },
});
