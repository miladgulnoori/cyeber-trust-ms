import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hi Milad Noori</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // makes the View take the whole screen
    backgroundColor: "white", // sets background to white
    justifyContent: "center", // centers content vertically
    alignItems: "center", // centers content horizontally
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    backgroundColor: "yellow",
  },
});
