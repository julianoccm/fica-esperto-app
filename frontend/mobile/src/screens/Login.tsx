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
import { useState } from "react";
import AuthService from "../services/auth-service";
import type { Login } from "../models/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const _goToRegister = () => {
    navigation.navigate("Register");
  };

  const _login = async () => {
    if (!email || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }
    setErrorMessage("")

    try {
      const authResponse = await AuthService.login({
        email,
        password,
      } as Login);

      console.log("Response received:", authResponse);

      await AsyncStorage.setItem("token", authResponse.token!!);
      await AsyncStorage.setItem("user", JSON.stringify(authResponse.user?.toJson()!!));

      navigation.navigate("Home");
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log("Axios error message:", error.response.data);
        setErrorMessage(error.response.data);
      } else {
        console.log(error);
        setErrorMessage("Ocorreu um erro ao fazer login.");
      }
    }
  };

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
          autoCapitalize="none"
          placeholder="Insira aqui seu email"
          keyboardType="email-address"
          onChange={(e) => setEmail(e.nativeEvent.text)}
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
          autoCapitalize="none"
          onChange={(e) => setPassword(e.nativeEvent.text)}
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
            Não tem uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>

        <Text style={styles.errorMessage}>{errorMessage}</Text>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
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
  errorMessage: {
    color: "red",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 30,
  },
});
