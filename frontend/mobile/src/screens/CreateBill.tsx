import { useNavigation, type NavigationProp } from "@react-navigation/native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import PageHeader from "../components/page-header";
import { Bill } from "../models/bill";
import BillService from "../services/bill-service";
import { useState } from "react";

export default function CreateBillScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [value, setValue] = useState<number>();
  const [dueDate, setDueDate] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const _validateDueDate = (text: string) => {
    let cleaned = text.replace(/\D/g, "");

    if (cleaned.length > 2 && cleaned.length <= 4) {
      cleaned = cleaned.replace(/^(\d{2})(\d{1,2})/, "$1/$2");
    } else if (cleaned.length > 4) {
      cleaned = cleaned.replace(/^(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
    }

    setDueDate(cleaned);
  };

  const _createBillAction = () => {
    setErrorMessage("");

    if (!name || !description || !value || !dueDate) {
      setErrorMessage("Preencha todos os campos para adicionar.");
      return;
    }

    const [day, month, year] = dueDate.split("/");
    const bill = Bill.fromJson({
      id: 0,
      name: name,
      description: description,
      value: value,
      dueDate: new Date(Number(year), Number(month) - 1, Number(day)),
      origin: "MANUAL",
      status: "PENDING",
      userId: 0,
    });

    BillService.createBill(bill)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch(() => {
        setErrorMessage("Erro ao criar a pendência. Tente novamente.");
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.spacer} />

      <PageHeader pageTitle="Adicionar uma nova pendência" />

      <View style={styles.spacerSmall} />
      <View style={styles.spacerSmall} />

      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Insira o nome da conta"
        onChange={(e) => setName(e.nativeEvent.text)}
        onFocus={(e) =>
          e.target.setNativeProps({ style: styles.formInputFucused })
        }
        onBlur={(e) =>
          e.target.setNativeProps({ style: styles.formInputUnfocused })
        }
      />

      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Insira a descrição da conta"
        onChange={(e) => setDescription(e.nativeEvent.text)}
        onFocus={(e) =>
          e.target.setNativeProps({ style: styles.formInputFucused })
        }
        onBlur={(e) =>
          e.target.setNativeProps({ style: styles.formInputUnfocused })
        }
      />

      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Insira o valor da conta"
        keyboardType="numeric"
        onChange={(e) => setValue(Number(e.nativeEvent.text))}
        onFocus={(e) =>
          e.target.setNativeProps({ style: styles.formInputFucused })
        }
        onBlur={(e) =>
          e.target.setNativeProps({ style: styles.formInputUnfocused })
        }
      />

      <TextInput
        style={styles.textInput}
        placeholder="Insira aqui a data de vencimento"
        autoCapitalize="none"
        value={dueDate}
        keyboardType="numeric"
        maxLength={10}
        onChangeText={(text) => {
          _validateDueDate(text);
        }}
        onFocus={(e) =>
          e.target.setNativeProps({ style: styles.formInputFucused })
        }
        onBlur={(e) =>
          e.target.setNativeProps({ style: styles.formInputUnfocused })
        }
      />

      <TouchableOpacity style={styles.buttonForm} onPress={_createBillAction}>
        <Text style={styles.buttonFormText}>Criar pendência</Text>
      </TouchableOpacity>

      <View style={styles.spacerSmall} />

      <Text style={styles.errorMessage}> {errorMessage} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  spacer: {
    height: 80,
  },
  spacerSmall: {
    height: 20,
  },
  container: {
    backgroundColor: "#F6F8FA",
    flex: 1,
    paddingHorizontal: 20,
  },
  textInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  formInputFucused: {
    borderColor: "#4d44e3",
    borderWidth: 1,
  },
  formInputUnfocused: {
    borderColor: "#ccc",
    borderWidth: 1,
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
  errorMessage: {
    color: "red",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 30,
  },
});
