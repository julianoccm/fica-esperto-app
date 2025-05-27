import { useNavigation, type NavigationProp } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const _goToRegister = () => {
    navigation.navigate("Login");
  };

  const _login = () => {};

  return (
    <>
      <View style={styles.containerHeader}>
        <Image source={require("../../assets/security.png")} />
        <Text style={styles.containerHeaderTitle}>Acesse a sua conta</Text>
        <Text style={styles.containerHeaderCaption}>
          Entre seu email e senha para realizar o acesso.
        </Text>
      </View>
      <View style={styles.formsContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Insira aqui seu email"
          keyboardType="email-address"
          onFocus={(e) =>
            e.target.setNativeProps({ style: styles.formInputFucused })
          }
          onBlur={(e) =>
            e.target.setNativeProps({ style: styles.formInputUnfocused })
          }
        />
        <TextInput
          style={styles.textInput}
          placeholder="Insira aqui sua senha"
          onFocus={(e) =>
            e.target.setNativeProps({ style: styles.formInputFucused })
          }
          onBlur={(e) =>
            e.target.setNativeProps({ style: styles.formInputUnfocused })
          }
          secureTextEntry
        />

        <TouchableOpacity style={styles.buttonForm} onPress={_login}>
          <Text style={styles.buttonFormText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonNavigation}
          onPress={_goToRegister}
        >
          <Text style={styles.buttonNavigationTex}>
            Já tem uma conta? Acesse
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.background}></View>
    </>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3f36cf",
    paddingTop: 20,
  },
  containerHeaderTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 12,
  },
  containerHeaderCaption: { color: "#fff", fontSize: 16 },
  formsContainer: {
    backgroundColor: "#fff",
    zIndex: 1,
    width: "90%",
    position: "absolute",
    top: "35%",
    left: "5%",
    borderRadius: 10,
    padding: 20,
    paddingVertical: 40,
  },
  textInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonForm: {
    backgroundColor: "#3f36cf",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonFormText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonNavigation: {
    marginTop: 25,
    alignItems: "center",
  },
  buttonNavigationTex: {
    color: "#3f36cf",
    fontSize: 14,
  },
  background: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F8FA",
  },
  formInputFucused: {
    borderColor: "#4d44e3",
    borderWidth: 1,
  },
  formInputUnfocused: {
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
