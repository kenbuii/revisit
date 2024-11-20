import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navbar from "../components/navbar";

const Itinerary = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <Navbar
        onPlanetPress={() => {
          /* TODO: Add navigation logic */
        }}
        onAddPress={() => {
          /* TODO: Add navigation logic */
        }}
        onStarPress={() => {
          /* TODO: Add navigation logic */
        }}
      />
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
  bottomNavPlaceholder: {
    height: 91,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F7F3F3",
  },
});

export default Itinerary;

