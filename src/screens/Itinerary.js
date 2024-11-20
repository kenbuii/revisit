import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Navbar from "../components/navbar";

const Itinerary = ({ route, navigation }) => {
  // Extract parameters passed via navigation
  const { day, activities } = route.params || {}; // Ensure route.params is optional to avoid errors

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>Itinerary Screen</Text>
        <Text style={styles.subtitle}>Plan your journey effectively!</Text>

        {/* Display day-specific data */}
        {day && activities && (
          <View style={styles.dayDetails}>
            <Text style={styles.dayText}>Day {day}</Text>
            {activities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <Text style={styles.activityType}>{activity.type.toUpperCase()}</Text>
                <Text style={styles.activityName}>{activity.name}</Text>
              </View>
            ))}
          </View>
        )}
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6D6D6D",
    marginBottom: 20,
    textAlign: "center",
  },
  dayDetails: {
    marginTop: 20,
    alignItems: "center",
  },
  dayText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  activityItem: {
    backgroundColor: "#F7F3F3",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  activityType: {
    fontSize: 14,
    color: "#959191",
    fontWeight: "bold",
  },
  activityName: {
    fontSize: 16,
    color: "#000000",
  },
});

export default Itinerary;
