import { StyleSheet, Text } from "react-native";

type TitleProps = {
  title: string;
};

export default function Title({ title }: TitleProps) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    width: "100%",
    fontSize: 24,
    fontWeight: "bold",
  },
});
