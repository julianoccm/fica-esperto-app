import { useNavigation, type NavigationProp } from "@react-navigation/native";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { Post } from "../models/post";
import type { NavigationStackParamList } from "../config/navigation-stack-param";
import { UserData } from "../models/user-data";
import { formatDate } from "../utils/date-utils";
import UserService from "../services/user-service";
import PostService from "../services/post-service";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const [data, setData] = useState<UserData>();
  const [posts, setPosts] = useState<Post[]>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const { width } = Dimensions.get("window");

  const _handlerError = (error: any) => {
    if (error.isAxiosError) {
      console.log("Axios error message:", error.response.data);
      setErrorMessage(error.response.data);
    } else {
      console.log(error);
      setErrorMessage("Ocorreu um erro ao carregar os dados.");
    }
  };

  const _getPostData = () => {
    PostService.getUserPostsByCategory()
      .then((responsePosts) => setPosts(responsePosts))
      .catch((error) => {
        console.error("Error fetching posts data:", error);
        _handlerError(error);
      });
  };

  const _getUserData = () => {
    UserService.getUserDataById(1)
      .then((userData) => setData(userData))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        _handlerError(error);
      });
  };

  const _goToSettings = () => {
    navigation.navigate("Settings");
  };

  useEffect(() => {
    _getPostData();
    _getUserData();
  }, [navigation]);

  if (data == null || posts == null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 20 }} />
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.welcomeTitle}>Seja bem vindo {data.name}!</Text>
            <Text style={styles.welcomeSubtitle}>
              Segue as dicas recomendadas para voce!
            </Text>
          </View>
          <TouchableOpacity onPress={_goToSettings}>
            <MaterialIcons name="settings" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={posts}
          keyExtractor={(post) => String(post.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          scrollEventThrottle={16}
          snapToOffsets={[...Array(posts.length)].map(
            (x, i) => i * (width * 0.8 + 30) + (i - 1) * 10
          )}
          decelerationRate="fast"
          style={styles.flatList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.postCard, { width: width * 0.8 }]}
              onPress={() => navigation.navigate("Post", { id: item.id })}
            >
              <Text style={styles.postCardTitle}>{item.title}</Text>
              <Text style={styles.postCardDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Minhas pendências financeiras</Text>

          {data.bills
            .slice()
            .sort((a, b) => b.id!! - a.id!!)
            .filter((a) => a.status == "PENDING")
            .slice(0, 3)
            .map((bill) => (
              <TouchableOpacity key={bill.id} style={styles.billCard}>
                <MaterialIcons
                  name="attach-money"
                  size={30}
                  color="white"
                  style={styles.billIconPending}
                />

                <View style={styles.billInfo}>
                  <Text style={styles.billDate}>
                    {formatDate(bill.dueDate)}
                  </Text>
                  <Text style={styles.billName}>{bill.name}</Text>
                </View>

                <Text style={styles.billValue}>
                  R$ {bill.value?.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}

          <TouchableOpacity style={styles.endSectionLink} onPress={() => {}}>
            <Text style={styles.endSectionLinkText}>
              Ver todas as pendências.
            </Text>
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, styles.sectionTitleMarginTop]}>
            Pendências finalizadas
          </Text>

          {data.bills
            .slice()
            .sort((a, b) => b.id!! - a.id!!)
            .filter((a) => a.status == "PAID")
            .slice(0, 3)
            .map((bill) => (
              <TouchableOpacity key={bill.id} style={styles.billCard}>
                <MaterialIcons
                  name="attach-money"
                  size={30}
                  color="white"
                  style={styles.billIconPaid}
                />

                <View style={styles.billInfo}>
                  <Text style={styles.billDate}>
                    {formatDate(bill.dueDate)}
                  </Text>
                  <Text style={styles.billName}>{bill.name}</Text>
                </View>

                <Text style={styles.billValue}>
                  R$ {bill.value?.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}

          <TouchableOpacity style={styles.endSectionLink} onPress={() => {}}>
            <Text style={styles.endSectionLinkText}>
              Ver todas as pendências finalizadas.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#F6F8FA",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    textAlign: "left",
    width: "100%",
    fontSize: 24,
    fontWeight: "bold",
  },
  welcomeSubtitle: {
    textAlign: "left",
    width: "100%",
    fontSize: 15,
    fontWeight: "400",
    paddingTop: 5,
  },
  flatList: {
    marginTop: 30,
    marginBottom: 30,
    flex: 1,
    alignContent: "center",
  },
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
  sectionContainer: {
    flex: 2,
    width: "100%",
  },
  sectionTitle: {
    textAlign: "left",
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sectionTitleMarginTop: {
    marginTop: 30,
  },
  billCard: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#fff",
    marginVertical: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  billIconPending: {
    alignSelf: "center",
    backgroundColor: "#f04646",
    padding: 6,
    borderRadius: 100,
  },
  billIconPaid: {
    alignSelf: "center",
    backgroundColor: "#23b065",
    padding: 6,
    borderRadius: 100,
  },
  billInfo: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 20,
  },
  billDate: {
    fontSize: 14,
    color: "#8f8d8d",
    fontWeight: "500",
  },
  billName: {
    fontSize: 16,
    color: "#4a4a4a",
    fontWeight: "500",
  },
  billValue: {
    alignSelf: "center",
    fontSize: 15,
    color: "#8f8d8d",
    fontWeight: "500",
    paddingRight: 5,
  },
  endSectionLink: {
    alignItems: "center",
    marginTop: 10,
  },
  endSectionLinkText: {
    color: "#3f36cf",
    fontSize: 14,
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
