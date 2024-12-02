import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as icons from "../assets/icons";
import { scale, verticalScale } from "react-native-size-matters";

const Navbar = ({
  onPlanetPress,
  onAddPress,
  onStarPress,
  isPlanetActiveOnSearchScreen,
  isAddActiveOnOtherScreens,
  isStarActiveOnProfileScreen,
}) => {
  const [isPlanetActive, setIsPlanetActive] = useState(
    isPlanetActiveOnSearchScreen
  );
  const [isAddActive, setIsAddActive] = useState(isAddActiveOnOtherScreens);
  const [isStarActive, setIsStarActive] = useState(isStarActiveOnProfileScreen);

  useEffect(() => {
    setIsPlanetActive(isPlanetActiveOnSearchScreen);
  }, [isPlanetActiveOnSearchScreen]);

  useEffect(() => {
    setIsAddActive(isAddActiveOnOtherScreens);
  }, [isAddActiveOnOtherScreens]);

  useEffect(() => {
    setIsStarActive(isStarActiveOnProfileScreen);
  }, [isStarActiveOnProfileScreen]);

  const togglePlanetIcon = () => {
    if (!isPlanetActiveOnSearchScreen) {
      setIsPlanetActive(!isPlanetActive); // Toggle planet icon if not on SearchScreen
    }
    if (onPlanetPress) {
      onPlanetPress(); // Call the onPlanetPress prop if provided
    }
  };

  const toggleAddIcon = () => {
    setIsAddActive(!isAddActive); // Toggle add icon state
    if (onAddPress) {
      onAddPress(); // Call the onAddPress prop if provided
    }
  };

  const toggleStarIcon = () => {
    setIsStarActive(!isStarActive); // Toggle star icon state
    if (onStarPress) {
      onStarPress(); // Call the onStarPress prop if provided
    }
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={togglePlanetIcon}>
        <Image
          source={isPlanetActive ? icons.planetOrange : icons.planet} // Toggle between planet icons
          style={styles.planetNavIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleAddIcon}>
        <Image
          source={isAddActive ? icons.addOrange : icons.add} // Toggle between add icons
          style={styles.plusNavIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleStarIcon}>
        <Image
          source={isStarActive ? icons.toggledStar : icons.navbarStar} // Toggle between star icons
          style={styles.starNavIcon}
        />
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
    width: scale(27),
    height: verticalScale(27),
    resizeMode: "contain",
  },
});

export default Navbar;
