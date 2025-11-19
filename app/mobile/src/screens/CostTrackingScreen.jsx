import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/header";

export default function CostTrackingScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Cost Tracking" />
      <View style={styles.container}>
        <Text style={styles.text}>Cost Tracking UI mockup (Week-1)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: { fontSize: 20, fontWeight: "600" },
});
