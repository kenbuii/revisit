import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as icons from '../assets/icons';

const Navbar = ({ navigation }) => {
  return (
    <View style={styles.bottomNav}>
      {/* Navigate to Search Screen */}
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Image source={icons.planetOrange} style={styles.planetNavIcon} />
      </TouchableOpacity>

      {/* Placeholder for Add Button */}
      <TouchableOpacity onPress={() => console.log('Add button pressed')}>
        <Image source={icons.add} style={styles.plusNavIcon} />
      </TouchableOpacity>

      {/* Navigate to Details Screen */}
      <TouchableOpacity onPress={() => navigation.navigate('Details', { fromNavbar: true })}>
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
  },
  planetNavIcon: {
    width: 39,
    height: 39,
    resizeMode: 'contain',
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

