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
import themes from "../assets/themes";
import { TouchableWithoutFeedback } from "react-native";
import Locations from "../assets/LocationCards/locations_index"; //TODO in refactoring: add locations from src/assets/LocationCards/locations_index.js, rather than hardcoded examples

const tags = ["sunsets", "sightsee", "thrifting", "energetic", "picnic"]; //currently hardcoded but can be changed LATER, after hi-fi
const cards = [ //also hardcoded, change after A8 submission to use Locations object in src/assets/LocationCards/locations_index.js
  {
    id: "1",
    title: "around Golden Gate 🌟 SF local foods, exploring sausalito",
    image: require("../assets/media/sfGolden.jpg"),
    username: "emilyinsf",
    likes: 289,
  },
  {
    id: "2",
    title: "rome - must visits ✈️",
    image: require("../assets/media/rome.jpeg"),
    username: "strawberry981",
    likes: 530,
  },
  {
    id: "3",
    title: "tokyo food tour 🍣 - taste of japan",
    image: require("../assets/media/japan.jpeg"),
    username: "sampow11",
    likes: 192,
  },
  {
    id: "4",
    title: "🗽 a walk through manhattan - new york sight seeing",
    image: require("../assets/media/manhattan.jpeg"),
    username: "worldoftshirts",
    likes: 48,
  },
];

const App = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((t) => t !== tag)
        : [...prevSelected, tag]
    );
  };

  const renderTag = ({ item }) => {
    const isSelected = selectedTags.includes(item);
    return (
      <TouchableWithoutFeedback onPress={() => toggleTag(item)}>
        <View
          style={[
            styles.tag,
            isSelected && { backgroundColor: "#E03616" }, // Change background instantly
          ]}
        >
          <Text
            style={[
              styles.tagText,
              isSelected && { color: "#FFFFFF" }, // Change text color instantly
            ]}
          >
            {item}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderCard = ({ item }) => {
    if (!item.title || !item.username) {
      console.error("Invalid card data:", item);
      return null; // Skip invalid cards
    }
    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardDetails}>
          <View style={styles.profile}>
            <Text style={styles.profileText}>{item.username}</Text>
          </View>
          <View style={styles.starred}>
            <Text style={styles.starredText}>{item.likes}</Text>
          </View>
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={themes.mainLogo}>revisit</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="where would you like to visit?"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
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
    paddingTop: 60,
  },
  searchBar: {
    height: 35,
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#F7F3F3",
    fontSize: 12,
    fontFamily: "RobotoMono",
    paddingLeft: 15,
    color: "black",
  },
  tagList: {
    paddingHorizontal: 10,
  },
  tag: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 15,
    borderRadius: 13,
    marginHorizontal: 5,
    height: 31,
    justifyContent: "center",
  },
  tagText: {
    fontSize: 11,
    color: "#000",
    fontWeight: "600",
    fontFamily: "RobotoMono-Medium",
  },
  cardList: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#F7F3F3",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    overflow: "hidden",
  },
  cardImage: {
    height: Dimensions.get("window").width / 2 - 20,
    width: "100%",
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 10,
    fontFamily: "RobotoSerif-Bold",
    margin: 8,
  },
  cardDetails: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  profile: {
    justifyContent: "flex-start",
    flexGrow: 1,
  },
  profileText: {
    fontSize: 8,
    color: "black",
    marginBottom: 10,
    marginHorizontal: 10,
    fontFamily: "RobotoMono",
  },
  starred: {
    justifyContent: "flex-end",
  },
  starredText: {
    fontSize: 8,
    color: "rgba(0, 0, 0, 0.4)",
    marginBottom: 10,
    marginHorizontal: 10,
    fontFamily: "RobotoMono",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 30,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F7F3F3",
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
