import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ActivityDetail = ({ route }) => {
  const { name } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <Text style={styles.activityName}>Activity: {name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 24,
    fontFamily: "RobotoMono-Bold",
    color: "#000000",
    marginBottom: 10,
  },
  activityName: {
    fontSize: 18,
    fontFamily: "RobotoMono-Regular",
    color: "#333333",
  },
});

export default ActivityDetail;
