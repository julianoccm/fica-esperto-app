import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { NavigationStackParamList } from "../config/navigation-stack-param";
import { formatDate } from "../utils/date-utils";
import type { Bill } from "../models/bill";

type BillCardProps = {
  bill: Bill;
};

export default function BillCard({ bill }: BillCardProps) {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const _goToBill = () => {
    navigation.navigate("BillInfo", { bill: bill });
  };

  return (
    <TouchableOpacity key={bill.id} style={styles.billCard} onPress={_goToBill}>
      <MaterialIcons
        name="attach-money"
        size={30}
        color="white"
        style={
          bill.status == "PENDING"
            ? styles.billIconPending
            : styles.billIconPaid
        }
      />

      <View style={styles.content}>
        <View style={styles.billInfo}>
          <Text style={styles.billDate}>{formatDate(bill.dueDate)}</Text>
          <Text
            style={
              bill.origin == "SERASA"
                ? styles.billOriginSerasa
                : styles.billOriginManual
            }
          >
            {bill.origin}
          </Text>
        </View>

        <View style={styles.billInfo}>
          <Text style={styles.billName}>{bill.name}</Text>
          <Text style={styles.billValue}>R$ {bill.value?.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  billCard: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#fff",
    marginVertical: 5,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
  },
  billIconPending: {
    alignSelf: "center",
    backgroundColor: "#f04646",
    padding: 6,
    borderRadius: 100,
  },
  billIconPaid: {
    alignSelf: "center",
    backgroundColor: "#23b065",
    padding: 6,
    borderRadius: 100,
  },
  billInfo: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
    paddingLeft: 10,
  },
  billDate: {
    fontSize: 14,
    color: "#8f8d8d",
    fontWeight: "500",
    alignSelf: "center",
  },
  billName: {
    fontSize: 14,
    color: "#4a4a4a",
    fontWeight: "600",
  },
  billOriginSerasa: {
    alignSelf: "flex-end",
    fontSize: 8,
    backgroundColor: "#f2aac9",
    borderColor: "#E81570",
    borderWidth: 2,
    textAlign: "center",
    borderRadius: 6,
    color: "#E81570",
    fontWeight: "bold",
    marginRight: 15,
    padding: 5,
    marginBottom: 2,
  },
  billOriginManual: {
    alignSelf: "flex-end",
    fontSize: 8,
    backgroundColor: "#f2ecaa",
    borderColor: "#b5a707",
    borderWidth: 2,
    textAlign: "center",
    borderRadius: 6,
    color: "#b5a707",
    fontWeight: "bold",
    marginRight: 15,
    padding: 5,
    marginBottom: 2,
  },
  billValue: {
    alignSelf: "flex-end",
    fontSize: 14,
    color: "#8f8d8d",
    fontWeight: "500",
    paddingRight: 15,
  },
});
