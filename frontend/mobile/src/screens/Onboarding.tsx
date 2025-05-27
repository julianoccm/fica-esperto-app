import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { StyleSheet, View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import type { NavigationStackParamList } from "../config/navigation-stack-param";

const slides = [
  {
    key: 1,
    title: "FicaEsperto",
    text: "Aplicativo de dicas de como ficar esperto contra os principais golpes aplicados no Brasil.",
    image: require("../../assets/1.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Finanças",
    text: "Com o FicaEsperto controla suas pendencias financeiras e fica esperto para não negativar seu nome.",
    image: require("../../assets/2.png"),
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Economia",
    text: "Com o FicaEsperto voce pode ver onde estão os seus principais gastos e como economizar.",
    image: require("../../assets/3.png"),
    backgroundColor: "#22bcb5",
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const _renderItem = ({ item }: { item: (typeof slides)[0] }) => {
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.itemImage} source={item.image} />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View>
        <Text style={styles.sliderButtonText}>Proximo</Text>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View>
        <Text style={styles.sliderButtonText}>Pronto</Text>
      </View>
    );
  };

  const _onDone = () => {
    navigation.navigate("Login");
  };

  return (
    <AppIntroSlider
      style={styles.container}
      renderItem={_renderItem}
      data={slides}
      onDone={_onDone}
      dotStyle={{ backgroundColor: "#ccc" }}
      activeDotStyle={{ backgroundColor: "#6c63ff" }}
      renderNextButton={_renderNextButton}
      renderDoneButton={_renderDoneButton}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sliderButtonText: {
    fontWeight: "600",
    color: "#000",
    fontSize: 18,
    paddingRight: 30,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  itemText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "300",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 100,
    marginTop: 10,
  },
  itemImage: {
    height: "30%",
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 20,
  },
});
