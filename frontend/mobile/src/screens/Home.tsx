import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
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
