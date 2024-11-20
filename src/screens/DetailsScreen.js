import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import * as icons from "../assets/icons";
import Navbar from "../components/navbar";

const DetailsScreen = ({ route }) => {
  const navigation = useNavigation(); // Initialize navigation

  // Extract the data passed via navigation
  const { title, image, username, likes } = route.params;

  const itineraryData = {
    username: "emilyinsf",
    profileImage: require("../assets/media/emilyProfile.png"),
    images: [
      require("../assets/media/sfGolden.jpg"),
      require('../assets/media/sfCable.jpg'),
      require('../assets/media/sfChina.jpg'),
      require('../assets/media/sfHaight.jpg'),
      require('../assets/media/sfLadies.jpg'),
      require('../assets/media/sfNiners.jpg'),
      require('../assets/media/sfPier.jpg'),
      // Add more images as needed
    ],
    days: [
      {
        day: 1,
        activities: [
          { type: "location", name: "Fisherman's Wharf" },
          { type: "food", name: "Pier Market Seafood" },
          { type: "shopping", name: "V Boutique" },
        ],
      },
      {
        day: 2,
        activities: [
          { type: "location", name: "Golden Gate Bridge" },
          { type: "location", name: "Sausalito" },
          { type: "food", name: "Barrel House Tavern" },
        ],
      },
      {
        day: 3,
        activities: [
          { type: "location", name: "MoMA" },
        ],
      },
    ],
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderDotIndicators = () => (
    // For image carousel
    <View style={styles.dotContainer}>
      {itineraryData.images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === currentImageIndex ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)" },
          ]}
        />
      ))}
    </View>
  );

  const renderActivityIcon = (type) => {
    switch (type) {
      case "location":
        return <Image source={icons.location} style={styles.activityIcon} />;
      case "food":
        return <Image source={icons.food} style={styles.activityIcon} />;
      case "shopping":
        return <Image source={icons.shopping} style={styles.activityIcon} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.leftarrow} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <Image source={itineraryData.profileImage} style={styles.profileImage} />
            <Text style={styles.username}>{itineraryData.username}</Text>
          </View>
        </View>

        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <Image source={itineraryData.images[currentImageIndex]} style={styles.mainImage} />
          <TouchableOpacity style={styles.starButton}>
            <Image source={icons.untoggledStar} style={styles.starIcon} />
          </TouchableOpacity>
          {renderDotIndicators()}
        </View>

        {/* Days and Activities */}
        {itineraryData.days.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <TouchableOpacity
              style={styles.dayWrapper}
              onPress={() =>
                navigation.navigate("Itinerary", {
                  day: day.day,
                  activities: day.activities,
                })
              } // Navigate to Itinerary.js with day-specific data
            >
              <View style={styles.dayNumberContainer}>
                <Text style={styles.dayText}>day {day.day}</Text>
              </View>
              <View style={styles.activitiesContainer}>
                {day.activities.map((activity, actIndex) => (
                  <View key={actIndex} style={styles.activityButton}>
                    <View style={styles.activityContent}>
                      {renderActivityIcon(activity.type)}
                      <Text style={styles.activityText}>{activity.name}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  username: {
    fontSize: 14,
    fontFamily: "RobotoMono-Regular",
  },
  imageContainer: {
    width: Dimensions.get("window").width - 40,
    height: 240,
    position: "relative",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  starButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  starIcon: {
    width: 24,
    height: 24,
  },
  dotContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  dayContainer: {
    padding: 20,
    paddingVertical: 10,
  },
  dayWrapper: {
    flexDirection: "row",
    backgroundColor: "rgba(247, 243, 243, 0.5)",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#959191",
  },
  activitiesContainer: {
    flex: 1,
    padding: 10,
    gap: 10,
    backgroundColor: 'rgba(247, 243, 243, 0.5)',
  },
  activityButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#959191",
  },
  activityContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  activityIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
    resizeMode: 'contain',
  },
  activityText: {
    fontSize: 14,
    fontFamily: "RobotoMono-Regular",
    color: "#000000",
  },
  dayNumberContainer: {
    justifyContent: "flex-start",
    padding: 15,
    backgroundColor: "#F7F3F3",
    minWidth: 80,
  },
  dayText: {
    fontSize: 22,
    fontFamily: "RobotoMono-Bold",
    color: "#000000",
    textAlign: "center",
  },
  bottomNavPlaceholder: {
    height: 91,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F7F3F3",
  },
});

export default DetailsScreen;