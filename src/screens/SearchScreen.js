import React, { useState, useEffect } from "react";
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
import { supabase } from "../services/supabaseClient";
//import Locations from "../assets/LocationCards/locations_index"; //TODO in refactoring: add locations from src/assets/LocationCards/locations_index.js, rather than hardcoded examples
import Navbar from "../components/navbar";
import { useNavigation } from "@react-navigation/native";

const tags = ["sunsets", "sightsee", "thrifting", "energetic", "picnic"];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [selectedTags, setSelectedTags] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cards from Supabase
  const fetchCards = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("cards").select("*");
    console.log(data);
    setCards(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((t) => t !== tag)
        : [...prevSelected, tag]
    );
  };

  // Render tag component
  const renderTag = ({ item }) => {
    const isSelected = selectedTags.includes(item);
    return (
      <TouchableOpacity onPress={() => toggleTag(item)}>
        <View
          style={[
            styles.tag,
            isSelected && { backgroundColor: "#E03616" }, // Change background if selected
          ]}
        >
          <Text
            style={[
              styles.tagText,
              isSelected && { color: "#FFFFFF" }, // Change text color if selected
            ]}
          >
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Render card component
  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("Details", {
            title: item.title,
            imageUrl: item.imageUrl,
            username: item.username,
            stars: item.stars,
          })
        }
      >
        <Image source={{ url: item.imageUrl }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardDetails}>
          <Text style={styles.profileText}>{item.username}</Text>
          <Text style={styles.starredText}>{item.stars}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={themes.mainLogo}>revisit</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="where would you like to visit?"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
      />
      {/* Render tags */}
      <FlatList
        data={tags}
        horizontal
        renderItem={renderTag}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.tagList}
        showsHorizontalScrollIndicator={false}
      />
      {isLoading ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>Loading...</Text>
      ) : (
        <FlatList
          data={cards}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.cardList}
        />
      )}
      <Navbar
        onPlanetPress={() => {/* TODO: Add navigation logic */}}
        onAddPress={() => {/* TODO: Add navigation logic */}}
        onStarPress={() => {/* TODO: Add navigation logic */}}
      />
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
    marginBottom: 12,
    backgroundColor: "#F7F3F3",
    fontSize: 12,
    fontFamily: "RobotoMono-Regular",
    color: "black",
  },
  tagList: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 15,
    borderRadius: 13,
    marginHorizontal: 5,
    height: 31,
    justifyContent: "center",
    marginBottom: 15,
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  profileText: {
    fontSize: 8,
    fontFamily: "RobotoSerif-Regular",
    color: "black",
  },
  starredText: {
    fontSize: 8,
    fontFamily: "RobotoSerif-Regular",
    color: "rgba(0, 0, 0, 0.4)",
  },
  // REDUNDANT: hardcoded bottom nav/icons -- can remove during post-A8 refactor
  // bottomNav: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   alignItems: "center",
  //   paddingVertical: 20,
  //   borderTopWidth: 1,
  //   borderColor: "#E0E0E0",
  //   backgroundColor: "#F7F3F3",
  // },
  // navIconImage: {
  //   width: 30,
  //   height: 50,
  //   resizeMode: "contain",
  
});

export default SearchScreen;
