import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as icons from "../assets/icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

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
    paddingBottom: "6%",
    paddingTop: "2%",
    backgroundColor: "#F7F3F3",
  },
  planetNavIcon: {
    width: scale(26),
    height: verticalScale(26),
    resizeMode: "contain",
  },
  plusNavIcon: {
    width: scale(25),
    height: verticalScale(25),
    resizeMode: "contain",
  },
  starNavIcon: {
    width: scale(24),
    height: verticalScale(24),
    resizeMode: "contain",
  },
});

export default Navbar;
