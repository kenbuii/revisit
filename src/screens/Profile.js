import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
} from "react-native";
import { supabase } from "../services/supabaseClient";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/navbar";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const Profile = () => {
  const navigation = useNavigation();
  const [starredCards, setStarredCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("starred");

  const fetchStarredCards = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq("myStar", true); // Only fetch cards with myStar set to true

    if (error) {
      console.error("Error fetching starred cards:", error.message);
    } else {
      setStarredCards(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStarredCards();
  }, []);

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Details", {
          id: item.id,
          title: item.title,
          imageUrl: item.imageUrl,
          username: item.username,
          stars: item.stars,
          profileImageUrl: item.profileImageUrl,
        })
      }
    >
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.cardDetails}>
        <View style={styles.cardProfile}>
          <Image
            source={{ uri: item.profileImageUrl }}
            style={styles.cardProfileImage}
          />
          <Text style={styles.profileText}>{item.username}</Text>
        </View>
        <View style={styles.star}>
          <Image
            source={require("../assets/icons/toggledStar.png")}
            style={styles.starIcon}
          />
          <Text style={styles.starredText}>{item.stars}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      style={styles.profileContainer}
      source={{
        uri: "https://i.pinimg.com/736x/74/48/61/744861aecf50d5706b878addd0fde090.jpg",
      }}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <Text style={styles.username}>strawberry981</Text>
      <View style={styles.statsContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://i.pinimg.com/736x/41/35/39/41353977821cda49096d1f66bcd2eaed.jpg",
          }}
        />
        <View style={styles.stat}>
          <Text style={styles.statValue}>275</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>74</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>53</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
      <View style={styles.container}>
        {/* Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab("starred")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "starred" && styles.activeTabText, // Apply active style conditionally
              ]}
            >
              starred
            </Text>
            {activeTab === "starred" && <View style={styles.underline} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab("my itineraries")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "my itineraries" && styles.activeTabText, // Apply active style conditionally
              ]}
            >
              my itineraries
            </Text>
            {activeTab === "my itineraries" && (
              <View style={styles.underline} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab("edit itinerary")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "edit itinerary" && styles.activeTabText,
              ]}
            >
              edit itineraries
            </Text>
            {activeTab === "edit itinerary" && <View style={styles.underline} />}
          </TouchableOpacity>
        </View>

        {/* Starred Cards */}
        {activeTab === "starred" && (
          <View style={styles.feed}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#E03616" />
            ) : (
              <FlatList
                data={starredCards}
                renderItem={renderCard}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.cardList}
              />
            )}
          </View>
        )}

        {/* My Itineraries Section */}
        {activeTab === "my itineraries" && (
          <View style={styles.feed}>
            <FlatList
              data={[{ id: "create", title: "Create New Itinerary" }]}
              renderItem={({ item }) =>
                item.id === "create" ? (
                  <TouchableOpacity
                    style={styles.createCard}
                    onPress={() => navigation.navigate("CreateItinerary")}
                  >
                    <Text style={styles.createCardText}>
                      create new itinerary
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate("Details", {
                        id: item.id,
                        title: item.title,
                        imageUrl: item.imageUrl,
                        username: item.username,
                        stars: item.stars,
                        profileImageUrl: item.profileImageUrl,
                      })
                    }
                  >
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>{item.title}</Text>
                  </TouchableOpacity>
                )
              }
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.cardList}
            />
          </View>
        )}

        {/* Edit Itinerary Section */}
        {activeTab === "edit itinerary" && (
          <View style={styles.feed}>
            <TouchableOpacity
              style={styles.createCard}
              onPress={() => navigation.navigate("EditItinerary")}
            >
              <Text style={styles.createCardText}>
                go to edit itinerary
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Navbar
        onPlanetPress={() => navigation.navigate("Search")}
        isPlanetActiveOnSearchScreen={false} // Pass false to make the planet icon toggle normally
        isStarActiveOnProfileScreen={true}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: "blue",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  username: {
    marginTop: verticalScale(60),
    width: "100%",
    paddingLeft: verticalScale(30),
    marginBottom: verticalScale(10),
    fontSize: moderateScale(24),
    fontFamily: "RobotoMono-Bold",
    color: "white",
  },
  statsContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    marginBottom: verticalScale(50),
  },
  cardProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 95,
    height: 95,
    resizeMode: "cover",
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "white",
    marginRight: moderateScale(10),
  },
  cardProfileImage: {
    height: verticalScale(10),
    width: scale(10),
    borderRadius: scale(10),
    resizeMode: "cover",
    marginRight: scale(3),
  },
  profileText: {
    fontSize: moderateScale(6),
    fontFamily: "RobotoSerif-Regular",
    color: "black",
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "white",
    fontFamily: "RobotoMono-Bold",
  },
  statLabel: {
    fontSize: moderateScale(12),
    color: "white",
    fontFamily: "RobotoMono-Medium",
  },
  container: {
    width: "100%",
    backgroundColor: "white",
    height: verticalScale(390),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginLeft: moderateScale(20),
  },
  tab: {
    paddingVertical: 15,
    marginRight: moderateScale(20),
  },
  tabText: {
    fontSize: moderateScale(13),
    fontFamily: "RobotoMono-Medium",
    fontWeight: "bold",
  },
  underline: {
    height: 2,
    backgroundColor: "#E03616", // Red underline
    width: "100%",
    marginTop: 5,
  },
  feed: {
    width: "100%",
    paddingHorizontal: 10,
    flex: 1,
  },
  cardList: {
    paddingBottom: verticalScale(5),
  },
  card: {
    width: scale(160),
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#F7F3F3",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    overflow: "hidden",
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scale(6),
    paddingBottom: verticalScale(4),
    flexGrow: 1,
    alignItems: "flex-end",
  },
  createCard: {
    width: scale(160),
    height: scale(180),
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#E03616", // The orange-red color for the card
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  createCardText: {
    color: "white",
    fontSize: moderateScale(12),
    fontFamily: "RobotoMono-Bold",
    textAlign: "center",
  },
  cardImage: {
    height: scale(155),
    width: "100%",
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: moderateScale(9),
    fontFamily: "RobotoSerif-Bold",
    marginHorizontal: 8,
    marginVertical: 4,
  },
  placeholderText: {
    fontSize: 18,
    color: "gray",
  },
  star: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    width: scale(8.5),
    height: verticalScale(8.5),
    resizeMode: "contain",
    marginRight: scale(3),
  },
  starredText: {
    fontSize: moderateScale(6),
    fontFamily: "RobotoSerif-Regular",
    color: "rgba(0, 0, 0, 0.4)",
    marginRight: scale(1),
  },
});

export default Profile;
