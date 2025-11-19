import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    backgroundColor: "#1e90ff",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
});
