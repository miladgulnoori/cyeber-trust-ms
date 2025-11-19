import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/header";

export default function EmployeeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Employees" />
      <View style={styles.container}>
        <Text style={styles.text}>Employee UI mockup (Week-1)</Text>
        <Text style={styles.sub}>CRUD will be added in Week 2–3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: { fontSize: 20, fontWeight: "600" },
  sub: { marginTop: 10, color: "gray" },
});
