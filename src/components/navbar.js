import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as icons from "../assets/icons";

const Navbar = ({ onPlanetPress, onAddPress, onStarPress }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={onPlanetPress}>
        <Image source={icons.planetOrange} style={styles.planetNavIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onAddPress}>
        <Image source={icons.add} style={styles.plusNavIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onStarPress}>
        <Image source={icons.navbarStar} style={styles.starNavIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 7,
    paddingBottom: 25,
    backgroundColor: "#F7F3F3",
  },
  planetNavIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  plusNavIcon: {
    width: 29,
    height: 29,
    resizeMode: "contain",
  },
  starNavIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});

export default Navbar;
