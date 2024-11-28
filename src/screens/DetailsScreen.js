import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../services/supabaseClient";
import Navbar from "../components/navbar";
import * as icons from "../assets/icons";

const DetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { id, title, imageUrl, username, profileImageUrl, stars } = route.params;

  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch activities from Supabase
  const fetchActivities = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("user_selected_activities")
      .select("*")
      .eq("card_id", id)
      .order("activity_day", { ascending: true });

    if (error) {
      console.error("Error fetching activities:", error.message);
    } else {
      setActivities(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Group activities by day
  const groupedActivities = activities.reduce((acc, activity) => {
    acc[activity.activity_day] = acc[activity.activity_day] || [];
    acc[activity.activity_day].push(activity);
    return acc;
  }, {});

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
            <Text style={styles.username}>{username}</Text>
          </View>
        </View>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.mainImage} />
        </View>

        {/* Activities by Day */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#E03616" style={styles.loader} />
        ) : Object.keys(groupedActivities).length === 0 ? (
          <Text style={styles.noActivities}>No activities found for this card.</Text>
        ) : (
          Object.entries(groupedActivities).map(([day, dayActivities]) => (
            <View key={day} style={styles.dayContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ActivityDetail", {
                    cardId: id, // Pass card ID to ActivityDetail
                    activityDay: parseInt(day), // Pass selected day to ActivityDetail
                  })
                }
                style={styles.dayWrapper}
              >
                {/* Day Number */}
                <View style={styles.dayNumberContainer}>
                  <Text style={styles.dayText}>day {day}</Text>
                </View>
                {/* Activities */}
                <View style={styles.activitiesContainer}>
                  {dayActivities.map((activity) => (
                    <View key={activity.id} style={styles.activityButton}>
                      <View style={styles.activityContent}>
                        {renderActivityIcon(activity.type)}
                        <Text style={styles.activityText}>{activity.activity_name}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Navbar */}
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingHorizontal: 20, // Add padding around the scrollable content
    paddingBottom: 20, // Add padding at the bottom to avoid navbar overlap
  },
  title: {
    fontSize: 24,
    fontFamily: "RobotoMono-Bold",
    textAlign: "center",
    paddingVertical: 20,
    color: "#000000",
    letterSpacing: -2.75,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20, // Add spacing below the header
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 18,
    marginRight: 10,
  },
  username: {
    fontSize: 14,
    fontFamily: "RobotoMono-Regular",
    color: "#000000",
  },
  imageContainer: {
    width: "100%",
    height: 240,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20, // Space below the image
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  loader: {
    marginTop: 20,
  },
  noActivities: {
    fontSize: 14,
    color: "gray",
    fontFamily: "RobotoMono-Regular",
    textAlign: "center",
  },
  dayContainer: {
    marginBottom: 20, // Space below each day container
  },
  dayWrapper: {
    flexDirection: "row",
    backgroundColor: "rgba(247, 243, 243, 0.5)",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#959191",
  },
  dayNumberContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#F7F3F3",
    minWidth: 80,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  dayText: {
    fontSize: 22,
    fontFamily: "RobotoMono-Bold",
    color: "#000000",
    textAlign: "center",
  },
  activitiesContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgba(247, 243, 243, 0.5)",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  activityButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#959191",
    marginBottom: 8,
  },
  activityContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  activityText: {
    fontSize: 14,
    fontFamily: "RobotoMono-Regular",
    color: "#000000",
  },
});

export default DetailsScreen;
