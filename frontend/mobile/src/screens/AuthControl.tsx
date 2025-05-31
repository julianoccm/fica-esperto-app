import { useNavigation, type NavigationProp } from "@react-navigation/native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";

import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingComponent from "../components/loading-component";

export default function AuthControlScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await AsyncStorage.getItem("user");

    if (token && user) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Onboarding");
    }
  };

  useEffect(() => {
    checkToken();
  }, [navigation]);

  return <LoadingComponent errorMessage="" />;
}