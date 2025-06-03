import { useFocusEffect, useNavigation, type NavigationProp } from "@react-navigation/native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";

import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import type { UserData } from "../models/user-data";
import UserService from "../services/user-service";
import { User } from "../models/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageHeader from "../components/page-header";
import LoadingComponent from "../components/loading-component";
import BillCard from "../components/bill-card";

export default function BillsScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const params = navigation.getState().routes[navigation.getState().index]
    ?.params as { id?: number; type?: string } | undefined;
  const id = params?.id;
  const type = params?.type;

  const [data, setData] = useState<UserData>();
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

  const _filterBills = (status: string) => {
    return data!!.bills
      .slice()
      .sort((a, b) => b.id!! - a.id!!)
      .filter((a) => a.status == status);
  };

  const _getTitle = () => {
    return type == "PAID"
      ? "Pendências finalizadas"
      : "Minhas pendências financeiras";
  };

  useFocusEffect(() => {
    _getUserData();
  });

  if (id == null || data == null) {
    return <LoadingComponent errorMessage={errorMessage} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />

      <PageHeader pageTitle={_getTitle()} />
      <View style={styles.spacerSmall} />

      <ScrollView style={styles.containerBills}>
        {_filterBills(type!!).map((bill) => (
          <BillCard bill={bill} key={bill.id} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  spacer: {
    height: 80,
  },
  spacerSmall: {
    height: 20,
  },
  container: {
    backgroundColor: "#F6F8FA",
    flex: 1,
    paddingHorizontal: 20,
  },
  containerBills: {
    flex: 1,
  },
});
