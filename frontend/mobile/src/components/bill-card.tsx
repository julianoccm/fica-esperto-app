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

  return (
    <TouchableOpacity key={bill.id} style={styles.billCard}>
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

      <View style={styles.billInfo}>
        <Text style={styles.billDate}>{formatDate(bill.dueDate)}</Text>
        <Text style={styles.billName}>{bill.name}</Text>
      </View>

      <Text style={styles.billValue}>R$ {bill.value?.toFixed(2)}</Text>
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
    paddingHorizontal: 10,
    borderRadius: 10,
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
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 20,
  },
  billDate: {
    fontSize: 14,
    color: "#8f8d8d",
    fontWeight: "500",
  },
  billName: {
    fontSize: 16,
    color: "#4a4a4a",
    fontWeight: "500",
  },
  billValue: {
    alignSelf: "center",
    fontSize: 15,
    color: "#8f8d8d",
    fontWeight: "500",
    paddingRight: 5,
  },
});
