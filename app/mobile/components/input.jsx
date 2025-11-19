import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

export default function Input({ label, error, ...props }) {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ marginBottom: 5, fontWeight: "600" }}>{label}</Text>

      <TextInput
        {...props}
        style={[
          styles.input,
          error ? { borderColor: "red" } : { borderColor: "#ccc" },
        ]}
      />

      {error && <Text style={{ color: "red", marginTop: 3 }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
});
