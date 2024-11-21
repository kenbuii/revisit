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
  ActivityIndicator,
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
  const [visibleCardsCount, setVisibleCardsCount] = useState(14);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [toggledStars, setToggledStars] = useState({});
  const [updatedStars, setUpdatedStars] = useState({});

  // Toggle Star Function
  const toggleStar = async (id, currentStars) => {
    const isCurrentlyToggled = toggledStars[id]; // Get the current toggled state of the star

    // Determine the new star count by using the updatedStars value
    const updatedStarCount = updatedStars[id] || currentStars; // If updatedStars is undefined, fallback to currentStars
    const newStarsCount = isCurrentlyToggled
      ? updatedStarCount - 1 // If already toggled, subtract from the updated count
      : updatedStarCount + 1; // If not toggled, add to the updated count

    setToggledStars((prevState) => ({
      ...prevState,
      [id]: !isCurrentlyToggled, // Toggle the star state
    }));

    try {
      const { error } = await supabase
        .from("cards")
        .update({ stars: newStarsCount })
        .eq("id", id);

      if (error) {
        console.error("Failed to update stars in Supabase:", error.message);

        // Revert the state if update fails
        setToggledStars((prevState) => ({
          ...prevState,
          [id]: isCurrentlyToggled, // Revert the star toggle
        }));
      } else {
        // If the update is successful, update the local state with the new count
        setUpdatedStars((prevState) => ({
          ...prevState,
          [id]: newStarsCount,
        }));
      }
    } catch (err) {
      console.error("Error updating stars:", err);

      // Revert the state if there's an error
      setToggledStars((prevState) => ({
        ...prevState,
        [id]: isCurrentlyToggled, // Revert the star toggle
      }));
    }
  };

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
    setVisibleCardsCount(14); // Reset visible cards to 14 on new search
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
            isSelected && { backgroundColor: "#E03616", borderColor: "white" }, // Change background if selected
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
    const currentStars =
      updatedStars[item.id] !== undefined ? updatedStars[item.id] : item.stars;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("Details", {
            id: item.id,
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
          <View style={styles.star}>
            <TouchableOpacity onPress={() => toggleStar(item.id, item.stars)}>
              <Image
                source={
                  toggledStars[item.id]
                    ? require("../assets/icons/toggledStar.png")
                    : require("../assets/icons/star.png")
                }
                style={styles.starIcon}
              />
            </TouchableOpacity>
            <Text style={styles.starredText}>
              {updatedStars[item.id] !== undefined
                ? updatedStars[item.id]
                : item.stars}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Handle load more cards when user scrolls
  const handleLoadMore = async () => {
    if (loadingMore || visibleCardsCount >= searchResults.length) return; // Stop if already loading or all cards are loaded
    setLoadingMore(true); // Start loading more

    // Simulate loading delay with setTimeout
    setTimeout(() => {
      setVisibleCardsCount(visibleCardsCount + 14); // Load next 14 cards
      setLoadingMore(false); // End loading more
    }, 1000); // Delay for 1 second (you can adjust the delay)
  };
  return (
    <View style={styles.container}>
      <Text style={themes.mainLogo}>revisit</Text>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={handleSearch}>
          <Image
            source={require("../assets/icons/search.png")}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.searchText}
          placeholder="where would you like to visit?"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch} // Triggers search when Enter is pressed
          returnKeyType="search" // Shows a search button on the keyboard
        />
        <TouchableOpacity onPress={() => setSearchQuery("")}>
          <Image
            source={require("../assets/icons/clear.png")}
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Render tags */}
      <View style={styles.tags}>
        <FlatList
          data={tags}
          horizontal
          renderItem={renderTag}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.tagList}
          showsHorizontalScrollIndicator={false}
        />
      </View>

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
            data={searchResults.slice(0, visibleCardsCount)} // Show only visible cards
            renderItem={renderCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.cardList}
            onEndReached={handleLoadMore} // Trigger load more when scrolled to bottom
            onEndReachedThreshold={0.5} // Load more when scrolled halfway
            ListFooterComponent={
              loadingMore ? (
                <View style={styles.loadingFooter}>
                  <ActivityIndicator
                    size="smaller"
                    color="rgba(0, 0, 0, 0.3)"
                  />
                </View>
              ) : null
            }
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
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 60,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 35,
    width: "91.5%",
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#F7F3F3",
  },
  searchIcon: {
    width: 15,
    resizeMode: "contain",
    marginRight: 8,
  },
  clearIcon: {
    width: 18,
    resizeMode: "contain",
    marginLeft: 8,
  },
  searchText: {
    fontSize: 11,
    fontFamily: "RobotoMono-Regular",
    color: "black",
    flex: 1,
  },
  tags: {
    width: "91%",
  },
  tagList: {
    marginBottom: 10,
    height: 30,
  },
  tag: {
    paddingHorizontal: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    marginRight: 9,
    height: 31,
    justifyContent: "center",
    marginBottom: 10,
  },
  tagText: {
    fontSize: 10,
    color: "#000",
    fontFamily: "RobotoMono-Medium",
  },
  feed: {
    width: "100%",
    height: 619,
    paddingBottom: 2,
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
    height: 180,
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
    paddingHorizontal: 6,
    paddingBottom: 4,
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
  star: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    width: 8.5,
    height: 8.5,
    resizeMode: "contain",
    marginRight: 3,
  },
  starredText: {
    fontSize: 6,
    fontFamily: "RobotoSerif-Regular",
    color: "rgba(0, 0, 0, 0.4)",
    marginRight: 2,
  },
  loadingFooter: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 15,
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
