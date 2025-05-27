import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  return (
    <>
      <Text>Home</Text>
    </>
  );
}

const styles = StyleSheet.create({
  
});
