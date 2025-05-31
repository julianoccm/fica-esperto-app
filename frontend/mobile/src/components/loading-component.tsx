import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type LoadingComponentProps = {
  errorMessage: string | undefined;
};

export default function LoadingComponent({
  errorMessage,
}: LoadingComponentProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
