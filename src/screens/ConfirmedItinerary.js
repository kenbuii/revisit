// This is the confirmed itinerary screen, after EditItinerary has been used
//TODO: add functionality for download and share

import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
import { checkmark } from "../assets/icons";

const ConfirmedItinerary = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Confirmed",
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={checkmark} />
      <Text>Itinerary Confirmed! </Text>
      <Text>This page is currently under construction.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ConfirmedItinerary;
