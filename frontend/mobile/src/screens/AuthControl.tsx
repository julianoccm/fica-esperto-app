import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthControlScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Onboarding");
    }
  };

  useEffect(() => {
    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
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
