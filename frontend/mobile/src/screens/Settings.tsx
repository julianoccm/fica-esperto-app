import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NavigationStackParamList } from "../config/navigation-stack-param";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const _logout = () => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("user ");

    navigation.navigate("AuthControl");
  };

  const _goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 20 }} />

      <TouchableOpacity
        style={{ alignSelf: "flex-start", marginBottom: 30 }}
        onPress={_goBack}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.welcomeTitle}>Configurações</Text>

      <TouchableOpacity style={styles.buttonForm} onPress={_logout}>
        <Text style={styles.buttonFormText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F8FA",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    textAlign: "left",
    width: "100%",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonForm: {
    backgroundColor: "#3f36cf",
    padding: 15,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonFormText: {
    color: "#fff",
    fontSize: 16,
  },
});
