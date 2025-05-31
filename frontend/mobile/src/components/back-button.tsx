import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";
import Ionicons from "@expo/vector-icons/Ionicons";

type BackButtonProps = {
  callback: Function;
};

export default function BackButton({ callback }: BackButtonProps) {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  return (
    <TouchableOpacity style={styles.backButton} onPress={() => callback()}>
      <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 30,
  },
});
