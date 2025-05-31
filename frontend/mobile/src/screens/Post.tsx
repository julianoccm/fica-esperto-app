import { useNavigation, type NavigationProp } from "@react-navigation/native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";

import { ScrollView, StyleSheet, Text, View } from "react-native";
import PostService from "../services/post-service";
import { useEffect, useState } from "react";
import { Post } from "../models/post";
import LoadingComponent from "../components/loading-component";
import PageHeader from "../components/page-header";

export default function PostScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();
  const id =
    navigation.getState().routes[navigation.getState().index]?.params?.id;

  const [post, setPost] = useState<Post>();
  const [errorMessage, setErrorMessage] = useState<string>();

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

  const _renderPostContent = (content: string) => {
    return content.split("\n").map((s, i) => {
      if (s !== "\\n") {
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
    });
  };

  useEffect(() => {
    _getPost(id!!);
  }, [navigation]);

  if (post == null || id == null || id == undefined) {
    return <LoadingComponent errorMessage={errorMessage} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.spacer} />
      <PageHeader pageTitle={post.title!!} />
      
      <Text style={styles.description}>{post.description}</Text>
      {_renderPostContent(post.content!!)}
      <Text style={styles.author}>Fonte: {post.author}</Text>
      
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F8FA",
    flex: 1,
    paddingHorizontal: 20,
  },
  spacer: {
    height: 80,
  },
  description: {
    fontSize: 15,
    textAlign: "justify",
    lineHeight: 25,
    marginVertical: 10,
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
