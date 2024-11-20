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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCards = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("cards").select("*");

    if (error) {
      console.error("Error fetching cards:", error.message);
    } else {
      setCards(data);
      setSearchResults(data); // Initialize searchResults with all cards
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Filter search results
  const handleSearch = () => {
    const results = cards.filter((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

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
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardDetails}>
          <View style={styles.cardProfile}>
            <Image
              source={{ uri: item.profileImageUrl }}
              style={styles.profileImage}
            />
            <Text style={styles.profileText}>{item.username}</Text>
          </View>
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
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch} // Triggers search when Enter is pressed
        returnKeyType="search" // Shows a search button on the keyboard
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
      <View style={styles.feed}>
        {isLoading ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 1000,
              fontFamily: "RobotoMono-Regular",
            }}
          >
            loading...
          </Text>
        ) : (
          <FlatList
            data={searchResults}
            renderItem={renderCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.cardList}
            key={`searchResults-${searchResults.length}`} // Add a unique key
          />
        )}
      </View>
      <Navbar
        onPlanetPress={() => {
          /* TODO: Add navigation logic */
        }}
        onAddPress={() => {
          /* TODO: Add navigation logic */
        }}
        onStarPress={() => {
          /* TODO: Add navigation logic */
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 60,
  },
  searchBar: {
    height: 35,
    width: "92%",
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#F7F3F3",
    fontSize: 12,
    fontFamily: "RobotoMono-Regular",
    color: "black",
  },
  tagList: {
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 30,
  },
  tag: {
    paddingHorizontal: 15,
    borderRadius: 13,
    marginHorizontal: 5,
    height: 31,
    justifyContent: "center",
    marginBottom: 10,
  },
  tagText: {
    fontSize: 11,
    color: "#000",
    fontFamily: "RobotoMono-Medium",
  },
  feed: {
    height: 600,
  },
  cardList: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  card: {
    width: 180,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#F7F3F3",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    overflow: "hidden",
  },
  cardImage: {
    height: 170,
    width: "100%",
    resizeMode: "cover",
  },
  cardText: {
    height: 50,
  },
  cardTitle: {
    fontSize: 9,
    fontFamily: "RobotoSerif-Bold",
    marginHorizontal: 8,
    marginVertical: 4,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 6,
    flexGrow: 1,
    alignItems: "flex-end",
  },
  cardProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    height: 10,
    width: 10,
    borderRadius: 10,
    resizeMode: "cover",
    marginRight: 3,
  },
  profileText: {
    fontSize: 6,
    fontFamily: "RobotoSerif-Regular",
    color: "black",
  },
  starredText: {
    fontSize: 6,
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
