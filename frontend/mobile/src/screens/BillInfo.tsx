import { useNavigation, type NavigationProp } from "@react-navigation/native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";

import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import type { UserData } from "../models/user-data";
import UserService from "../services/user-service";
import { User } from "../models/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageHeader from "../components/page-header";
import LoadingComponent from "../components/loading-component";
import BillCard from "../components/bill-card";
import type { Bill } from "../models/bill";
import { formatDate } from "../utils/date-utils";
import BillService from "../services/bill-service";

export default function BillInfoScreen() {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const params = navigation.getState().routes[navigation.getState().index]
    ?.params as { bill?: Bill } | undefined;
  const bill = params?.bill;

  const _billAction = () => {
    if (bill?.status == "PENDING") {
      BillService.payBill(bill.id!!);
    } else {
      BillService.pendeciateBill(bill?.id!!);
    }

    navigation.navigate("Home");
  };

  const _billDeleteAction = () => {
    BillService.deleteBill(bill?.id!!);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />

      <PageHeader pageTitle="Detalhes da sua conta" />

      {bill && (
        <View>
          <View style={styles.spacerSmall} />

          <Text style={styles.title}>Nome:</Text>
          <Text style={styles.value}>{bill.name}</Text>

          <Text style={styles.title}>Data de vencimento:</Text>
          <Text style={styles.value}>{formatDate(bill.dueDate)}</Text>

          <Text style={styles.title}>Descrição:</Text>
          <Text style={styles.value}>{bill.description}</Text>

          <Text style={styles.title}>Valor:</Text>
          <Text style={styles.value}>{bill.value}</Text>

          <Text style={styles.title}>Origem da conta:</Text>
          <Text style={styles.value}>
            {bill.origin!!.charAt(0).toUpperCase() +
              bill.origin!!.slice(1).toLowerCase()}
          </Text>

          <Text style={styles.title}>Status da conta:</Text>
          <Text style={styles.value}>
            {bill.status == "PENDING" ? "Pendente" : "Pago"}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.buttonForm} onPress={_billAction}>
        <Text style={styles.buttonFormText}>
          {bill!!.status == "PENDING" ? "Pagar" : "Pendenciar"}
        </Text>
      </TouchableOpacity>

      {bill?.origin == "SERASA" ? null : (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={_billDeleteAction}
        >
          <Text style={styles.deleteButtonText}>Deletar conta</Text>
        </TouchableOpacity>
      )}

      <View style={styles.spacerSmall} />
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
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 0,
  },
  value: {
    fontSize: 18,
    marginBottom: 15,
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
  deleteButton: {
    padding: 15,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#f04646",
    fontSize: 16,
    fontWeight: "bold",
  },
});
