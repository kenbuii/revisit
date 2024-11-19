import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as icons from '../assets/icons';

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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F7F3F3',
    //backgroundColor: 'blue',
  },
  planetNavIcon: {
    width: 39,
    height: 39,
    resizeMode: 'contain',
    //backgroundColor: 'red',
  },
  plusNavIcon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
  starNavIcon: {
    width: 37,
    height: 37,
    resizeMode: 'contain',
  },
});

export default Navbar;
