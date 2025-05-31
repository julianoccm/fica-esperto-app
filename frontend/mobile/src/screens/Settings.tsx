import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NavigationStackParamList } from "../config/navigation-stack-param";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageHeader from "../components/page-header";

export default function SettingsScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const _logout = () => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("user ");
    navigation.navigate("AuthControl");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.spacer} />

      <PageHeader pageTitle="Configurações" />

      <TouchableOpacity style={styles.buttonForm} onPress={_logout}>
        <Text style={styles.buttonFormText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spacer: {
    height: 20,
  },
  container: {
    backgroundColor: "#F6F8FA",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
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
