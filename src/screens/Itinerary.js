import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Itinerary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Optional: set a background color
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000", // Optional: set a text color
  },
});

export default Itinerary;

