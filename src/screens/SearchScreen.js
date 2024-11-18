import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import * as icons from "../assets/icons";

const tags = ["sunsets", "sightsee", "thrifting", "energetic", "picnic"];
const cards = [
  {
    id: "1",
    title: "around Golden Gate 🌟 SF local foods, exploring sausalito",
    image: "https://via.placeholder.com/150",
    username: "emilyinsf",
    likes: 289,
  },
  {
    id: "2",
    title: "rome - must visits ✈️",
    image: "https://via.placeholder.com/150",
    username: "strawberry981",
    likes: 530,
  },
  {
    id: "3",
    title: "tokyo food tour 🍣 - taste of japan",
    image: "https://via.placeholder.com/150",
    username: "sampow11",
    likes: 192,
  },
  {
    id: "4",
    title: "🗽 a walk through manhattan - new york sight seeing",
    image: "https://via.placeholder.com/150",
    username: "worldoftshirts",
    likes: 48,
  },
];

const App = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags(
      (prevSelected) =>
        prevSelected.includes(tag)
          ? prevSelected.filter((t) => t !== tag) 
          : [...prevSelected, tag] 
    );
  };

  const renderTag = ({ item }) => {
    const isSelected = selectedTags.includes(item);
    return (
      <TouchableOpacity
        style={[
          styles.tag,
          isSelected && { backgroundColor: "#E03616" }, // Change background 
        ]}
        onPress={() => toggleTag(item)}
      >
        <Text
          style={[
            styles.tagText,
            isSelected && { color: "#FFFFFF" }, //changes it to red  
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
      <Text style={styles.cardDetails}>
        by {item.username} • {item.likes} likes
      </Text>
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
          <Image source={icons.planet} style={styles.navIconImage} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={icons.add} style={styles.navIconImage} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={icons.star} style={styles.navIconImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 70,
  },
  title: {
    fontSize: 32,
    fontFamily: "RobotoSerif-Bold",
    textAlign: "center",
    color: "#E03616",
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: "#E0E0E0",
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
    backgroundColor: "#F5F5F5",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    height: 35,
    justifyContent: "center",
  },
  tagText: {
    fontSize: 14,
    color: "#000",
  },
  cardList: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#FFF",
    elevation: 2, // For shadow on Android
    shadowColor: "#000", // For shadow on iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    overflow: "hidden",
  },
  cardImage: {
    height: Dimensions.get("window").width / 2 - 20,
    width: "100%",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
  },
  cardDetails: {
    fontSize: 12,
    color: "#888",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 30,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
  },
  navIcon: {
    fontSize: 24,
  },
  navIconImage: {
    width: 30, // Adjust as needed
    height: 35, // Adjust as needed
    resizeMode: "contain",
  },
});

export default App;
