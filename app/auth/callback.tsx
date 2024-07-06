import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const Callback = () => {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Route: {route.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Tło kontenera
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Kolor tekstu
  },
});

export default Callback;
