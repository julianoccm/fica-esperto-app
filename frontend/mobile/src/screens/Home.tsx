import { useNavigation, type NavigationProp } from "@react-navigation/native";
import {
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
import UserService from "../services/user-service";
import PostService from "../services/post-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/user";
import BillCard from "../components/bill-card";
import PostCard from "../components/post-card";
import LoadingComponent from "../components/loading-component";
import { useFocusEffect } from "@react-navigation/native";

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

  const _getUserData = async () => {
    const userStorage = await AsyncStorage.getItem("user");
    if (!userStorage) {
      throw new Error("No user found in AsyncStorage");
    }

    const user = User.fromJson(JSON.parse(userStorage));

    UserService.getUserDataById(user.id!!)
      .then((userData) => setData(userData))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        _handlerError(error);
      });
  };

  const _filterBills = (
    status: string,
    rangeInitial: number,
    rangeFinal: number
  ) => {
    return data!!.bills
      .slice()
      .sort((a, b) => b.id!! - a.id!!)
      .filter((a) => a.status == status)
      .slice(rangeInitial, rangeFinal);
  };

  const _goToSettings = () => {
    navigation.navigate("Settings");
  };

  const _goToPendingBill = () => {
    navigation.navigate("Bills", { id: data?.id, type: "PENDING" });
  };

  const _goToPaidBill = () => {
    navigation.navigate("Bills", { id: data?.id, type: "PAID" });
  };

  useFocusEffect(() => {
    _getPostData();
    _getUserData();
  });

  if (data == null || posts == null) {
    return <LoadingComponent errorMessage={errorMessage} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 20 }} />
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.welcomeTitle}>
              Seja bem vindo {data.name?.split(" ")[0]}!
            </Text>
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
          renderItem={({ item }) => <PostCard post={item} key={item.id} />}
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Minhas pendências financeiras</Text>
          {_filterBills("PENDING", 0, 3).length === 0 ? (
            <Text style={styles.textNoPendencies}>
              Nenhuma pendência encontrada, clique no + para cadastrar uma nova
              pendência manualmente.
            </Text>
          ) : (
            <>
              {_filterBills("PENDING", 0, 3).map((bill) => (
                <BillCard bill={bill} key={bill.id} />
              ))}
              <TouchableOpacity
                style={styles.endSectionLink}
                onPress={_goToPendingBill}
              >
                <Text style={styles.endSectionLinkText}>
                  Ver todas as pendências.
                </Text>
              </TouchableOpacity>
            </>
          )}

          <Text style={[styles.sectionTitle, styles.sectionTitleMarginTop]}>
            Pendências finalizadas
          </Text>

          {_filterBills("PAID", 0, 3).length === 0 ? (
            <Text style={styles.textNoPendencies}>
              Nenhuma pendência encontrada, clique no + para cadastrar uma nova
              pendência manualmente.
            </Text>
          ) : (
            <>
              {_filterBills("PAID", 0, 3).map((bill) => (
                <BillCard bill={bill} key={bill.id} />
              ))}
              <TouchableOpacity
                style={styles.endSectionLink}
                onPress={_goToPaidBill}
              >
                <Text style={styles.endSectionLinkText}>
                  Ver todas as pendências finalizadas.
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spacer: {
    height: 40,
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
  endSectionLink: {
    alignItems: "center",
    marginTop: 10,
  },
  endSectionLinkText: {
    color: "#3f36cf",
    fontSize: 14,
    fontWeight: "bold",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textNoPendencies: {
    color: "#888",
    textAlign: "left",
    marginBottom: 10,
  },
});
