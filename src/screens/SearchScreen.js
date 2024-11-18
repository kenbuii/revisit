/*// src/screens/SearchScreen.js
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
*/
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

// bottom nav buttons ;) 
import StarIcon from '/Users/tylerhuang/Desktop/revisit/src/assets/icons/Star.png';
import AddButton from '/Users/tylerhuang/Desktop/revisit/src/assets/icons/Add.png';
import PlanetIcon from '/Users/tylerhuang/Desktop/revisit/src/assets/icons/Planet(Orange).png';

const tags = ["sunsets", "sightsee", "thrifting", "energetic", "picnic"];
const cards = [
  { id: '1', title: 'around Golden Gate 🌟 SF local foods, exploring sausalito', image: 'https://via.placeholder.com/150', username: 'emilyinsf', likes: 289 },
  { id: '2', title: 'rome - must visits ✈️', image: 'https://via.placeholder.com/150', username: 'strawberry981', likes: 530 },
  { id: '3', title: 'tokyo food tour 🍣 - taste of japan', image: 'https://via.placeholder.com/150', username: 'sampow11', likes: 192 },
  { id: '4', title: '🗽 a walk through manhattan - new york sight seeing', image: 'https://via.placeholder.com/150', username: 'WorldofTshirts', likes: 48 },
];

const App = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((t) => t !== tag) // Remove tag if already selected
        : [...prevSelected, tag] // Add tag if not selected
    );
  };

  const renderTag = ({ item }) => {
    const isSelected = selectedTags.includes(item);
    return (
      <TouchableOpacity
        style={[
          styles.tag,
          isSelected && { backgroundColor: '#E03616' }, // Change background if selected
        ]}
        onPress={() => toggleTag(item)}
      >
        <Text
          style={[
            styles.tagText,
            isSelected && { color: '#FFFFFF' }, // Change text color if selected
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDetails}>by {item.username} • {item.likes} likes</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>revisit</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Where would you like to visit?"
      />
      <FlatList
        data={tags}
        horizontal
        renderItem={renderTag}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.tagList}
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.cardList}
      />
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
        <Image source={PlanetIcon} style={styles.navIconImage} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image source={AddButton} style={styles.navIconImage} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={StarIcon} style={styles.navIconImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 70,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E03616',
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  tagList: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tag: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    height: 35,
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 14,
    color: '#000',
  },
  cardList: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 2, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    overflow: 'hidden',
  },
  cardImage: {
    height: Dimensions.get('window').width / 2 - 20,
    width: '100%',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
  },
  cardDetails: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  navIcon: {
    fontSize: 24,
  },
  navIconImage: {
    width: 30, // Adjust as needed
    height: 30, // Adjust as needed
    resizeMode: 'contain',
  },
});

export default App;
