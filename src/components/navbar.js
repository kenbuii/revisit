import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as icons from '../assets/icons';

const Navbar = ({ onPlanetPress, onAddPress, onStarPress }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={onPlanetPress}>
        <Image source={icons.planet} style={styles.navIconImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onAddPress}>
        <Image source={icons.add} style={styles.navIconImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onStarPress}>
        <Image source={icons.star} style={styles.navIconImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F7F3F3',
  },
  navIconImage: {
    width: 30,
    height: 50,
    resizeMode: 'contain',
  },
});

export default Navbar;
