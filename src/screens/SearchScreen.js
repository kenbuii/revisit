// src/screens/SearchScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SearchScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>revisit</Text>
        <Text style={styles.question}>where would you like to visit?</Text>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // Handle the selected location here
            console.log(data, details);
          }}
          query={{
            key: 'YOUR_GOOGLE_PLACES_API_KEY',
            types: '(cities)',
          }}
          styles={{
            container: styles.searchContainer,
            textInput: styles.searchInput,
            listView: styles.listView,
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          debounce={300}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    fontFamily: 'RobotoSerif',
    fontSize: 32,
    color: '#E03616',
    textAlign: 'center',
    marginBottom: 40,
  },
  question: {
    fontFamily: 'RobotoSerif',
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  searchContainer: {
    flex: 0,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E03616',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  listView: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginTop: 5,
  },
});

export default SearchScreen;