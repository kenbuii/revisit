// route page for adding activities to the editable itinerary

import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";

const AddActivities = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add Activities",
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Activities</Text>
      <Text style={styles.text}>This page is currently under construction.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontFamily: "RobotoMono-Bold",
    color: "#E03616",
  },
  text: {
    fontSize: 16,
    fontFamily: "RobotoMono-Regular",
  },
});

export default AddActivities;