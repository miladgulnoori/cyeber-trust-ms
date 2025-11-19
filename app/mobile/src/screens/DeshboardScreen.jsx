import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Header from "../../components/header";

export default function DashboardScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Dashboard" />
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Employees")}
          style={styles.card}
        >
          <Text style={styles.text}>Employees</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Departments")}
          style={styles.card}
        >
          <Text style={styles.text}>Departments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Tasks")}
          style={styles.card}
        >
          <Text style={styles.text}>Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Projects")}
          style={styles.card}
        >
          <Text style={styles.text}>Projects</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Quotations")}
          style={styles.card}
        >
          <Text style={styles.text}>Quotations</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("CostTracking")}
          style={styles.card}
        >
          <Text style={styles.text}>Cost Tracking</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: "#1e90ff",
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
