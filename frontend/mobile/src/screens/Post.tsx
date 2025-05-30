import { useNavigation, type NavigationProp } from "@react-navigation/native";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostService from "../services/post-service";
import { useEffect, useState } from "react";
import { Post } from "../models/post";

export default function PostScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();
  const id =
    navigation.getState().routes[navigation.getState().index]?.params?.id;

  const [post, setPost] = useState<Post>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const _goBack = () => {
    navigation.goBack();
  };

  const _handlerError = (error: any) => {
    if (error.isAxiosError) {
      console.log("Axios error message:", error.response.data);
      setErrorMessage(error.response.data);
    } else {
      console.log(error);
      setErrorMessage("Ocorreu um erro ao carregar os dados.");
    }
  };

  const _getPost = (id: number) => {
    PostService.getUserPostsById(id)
      .then((data) => setPost(data))
      .catch((error) => {
        console.log("Error fetching posts: ", error);
        _handlerError(error);
      });
  };

  useEffect(() => {
    _getPost(id!!);
  }, [navigation]);

  if (post == null || id == null || id == undefined) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ height: 80 }} />

      <TouchableOpacity
        style={{ alignSelf: "flex-start", marginBottom: 30 }}
        onPress={_goBack}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>

      {post.content?.split("\n").map((s, i) => {
        if (s != "\\n") {
          if (s.startsWith("#")) {
            return (
              <Text key={i} style={styles.titleContent}>
                {s.replace("#", "")}
              </Text>
            );
          } else {
            return (
              <Text key={i} style={styles.textContent}>
                {s}
              </Text>
            );
          }
        }
      })}

      <Text style={styles.author}>Fonte: {post.author}</Text>
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F8FA",
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "left",
    width: "100%",
    fontSize: 26,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    textAlign: "justify",
    lineHeight: 25,
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  titleContent: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 12,
  },
  textContent: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: "justify",
    marginBottom: 10,
  },
  author: {
    marginTop: 20,
  },
});
