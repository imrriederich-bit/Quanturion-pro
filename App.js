import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quanturion Pro 🚀</Text>
      <Text style={styles.subtitle}>
        Premium Version aktiv
      </Text>
      <Text style={styles.text}>
        Deutsch | English | עברית
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold"
  },
  subtitle: {
    color: "#00ffcc",
    fontSize: 18,
    marginTop: 10
  },
  text: {
    color: "#ccc",
    marginTop: 20
  }
});
