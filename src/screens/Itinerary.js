import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import Navbar from "../components/navbar";
import * as icons from "../assets/icons";

const Itinerary = ({ route, navigation }) => {
  // Extract parameters passed via navigation
  const { day, activities } = route.params || {}; // Ensure route.params is optional to avoid errors



  
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
      <ScrollView contentContainerStyle={styles.content}>
        {/* Day Header */}
        {day && (
          <View style={styles.dayHeader}>
            <Text style={styles.dayText}>day {day}</Text>
          </View>
        )}

        {/* Activities */}
        {activities &&
          activities.map((activity, index) => (
            <View key={index} style={styles.activityCard}>
              <View style={styles.activityContent}>
                {renderActivityIcon(activity.type)}
                <Text style={styles.activityText}>{activity.name}</Text>
              </View>
            </View>
          ))}
      </ScrollView>

      {/* Navbar */}
      <Navbar
        navigation={navigation} // Pass navigation for navbar navigation logic
        onAddPress={() => console.log("Add button pressed!")}
        onStarPress={() => console.log("Star button pressed!")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dayHeader: {
    marginBottom: 20,
  },
  dayText: {
    fontSize: 24,
    fontFamily: "RobotoMono-Bold",
    color: "#000000",
    textTransform: "lowercase",
    textAlign: "left",
  },
  activityCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#959191",
    marginBottom: 10,
    alignItems: "center",
  },
  activityContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  activityIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
    resizeMode: "contain",
  },
  activityText: {
    fontSize: 16,
    fontFamily: "RobotoMono-Regular",
    color: "#000000",
  },
  
});

export default Itinerary;
