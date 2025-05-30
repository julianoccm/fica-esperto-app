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
import type { UserData } from "../models/user-data";
import UserService from "../services/user-service";
import { MaterialIcons } from "@expo/vector-icons";
import { formatDate } from "../utils/date-utils";

export default function BillsScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const params = navigation.getState().routes[navigation.getState().index]
    ?.params as { id?: number; type?: string } | undefined;
  const id = params?.id;
  const type = params?.type;

  const [data, setData] = useState<UserData>();
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

  const _getUserData = () => {
    UserService.getUserDataById(1)
      .then((userData) => setData(userData))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        _handlerError(error);
      });
  };

  useEffect(() => {
    _getUserData();
  }, [navigation]);

  if (id == null || data == null) {
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

      {type == "PAID" ? (
        <Text style={styles.title}>Pendências finalizadas</Text>
      ) : (
        <Text style={styles.title}>Minhas pendências financeiras</Text>
      )}

      {data.bills
        .slice()
        .sort((a, b) => b.id!! - a.id!!)
        .filter((a) => a.status == type)
        .map((bill) => (
          <TouchableOpacity key={bill.id} style={styles.billCard}>
            <MaterialIcons
              name="attach-money"
              size={30}
              color="white"
              style={
                type == "PAID" ? styles.billIconPaid : styles.billIconPending
              }
            />

            <View style={styles.billInfo}>
              <Text style={styles.billDate}>{formatDate(bill.dueDate)}</Text>
              <Text style={styles.billName}>{bill.name}</Text>
            </View>

            <Text style={styles.billValue}>R$ {bill.value?.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}

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
    marginBottom: 20,
    fontWeight: "bold",
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
});
