import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as icons from "../assets/icons";
import Navbar from "../components/navbar";

const DetailsScreen = ({ route }) => {
  const navigation = useNavigation();

  // Extract data passed via navigation
  const { title, imageUrl, username, stars, itineraryData } = route.params;
  console.log("hello");

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.leftarrow} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.userInfoContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.profileContainer}>
            <Image source={{ uri: imageUrl }} style={styles.profileImage} />
            <Text style={styles.username}>{username}</Text>
          </View>
        </View>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.mainImage} />
          <TouchableOpacity style={styles.starButton}>
            <Image source={icons.untoggledStar} style={styles.starIcon} />
          </TouchableOpacity>
        </View>

        {/* Optional: Itinerary Data */}
        {itineraryData?.days && (
          <View>
            {itineraryData.days.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <Text style={styles.dayTitle}>Day {day.day}</Text>
                {day.activities.map((activity, actIndex) => (
                  <View key={actIndex} style={styles.activityContainer}>
                    <Text style={styles.activityText}>{activity.name}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
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
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  userInfoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
  },
  profileImage: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 10,
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
  title: {
    fontSize: 12,
    fontFamily: "RobotoMono-Bold",
    textAlign: "center",
    marginBottom: 5,
  },
  starsText: {
    fontSize: 14,
    fontFamily: "RobotoMono-Regular",
    color: "#555",
  },
  dayContainer: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#000000",
    borderRadius: 10,
  },
  dayTitle: {
    fontSize: 18,
    fontFamily: "RobotoMono-Bold",
    marginBottom: 5,
  },
  activityContainer: {
    padding: 5,
  },
  activityText: {
    fontSize: 14,
    fontFamily: "RobotoMono-Regular",
  },
});

export default DetailsScreen;
