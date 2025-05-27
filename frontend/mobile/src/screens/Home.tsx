import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";
import { useEffect, useState } from "react";
import UserService from "../services/user-service";
import { UserData } from "../models/user-data";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const [data, setData] = useState<UserData>();

  useEffect(() => {
    UserService.getUserDataById(3)
      .then((userData) => {
        setData(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data?.toJson())}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
