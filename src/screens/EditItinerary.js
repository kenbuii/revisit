// todo: ability to edit both previously saved itineraries 
// and itineraries created in the create itinerary screen/my itineraries screen

import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { supabase } from "../services/supabaseClient";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/navbar";
import * as icons from "../assets/icons";


const EditItineraryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Edit Itinerary</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default EditItineraryScreen;

