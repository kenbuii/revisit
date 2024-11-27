import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
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
  const [starCount, setStarCount] = useState(stars);
  const [starToggled, setStarToggled] = useState(false);

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

  // Toggle star functionality
  const toggleStar = async () => {
    const newStarCount = starToggled ? starCount - 1 : starCount + 1;

    try {
      const { error } = await supabase
        .from("cards")
        .update({ stars: newStarCount })
        .eq("id", id);

      if (error) {
        console.error("Error updating star count:", error.message);
      } else {
        setStarCount(newStarCount);
        setStarToggled(!starToggled);
      }
    } catch (err) {
      console.error("Error updating stars:", err);
    }
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
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.leftarrow} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
            <Text style={styles.username}>{username}</Text>
          </View>
        </View>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.mainImage} />
          <TouchableOpacity style={styles.starButton} onPress={toggleStar}>
            <Image
              source={starToggled ? icons.toggledStar : icons.untoggledStar}
              style={styles.starIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Activities by Day */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#E03616" style={styles.loader} />
        ) : Object.keys(groupedActivities).length === 0 ? (
          <Text style={styles.noActivities}>No activities found for this card.</Text>
        ) : (
          Object.entries(groupedActivities).map(([day, dayActivities]) => (
            <View key={day} style={styles.dayContainer}>
              <View style={styles.dayWrapper}>
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
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Navbar */}
      <Navbar
        onPlanetPress={() => {
          navigation.navigate("Search");
        }}
        onAddPress={() => {
          // Add navigation or functionality here
        }}
        onStarPress={() => {
          // Add navigation or functionality here
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
  activitiesContainer: {
    flex: 1,
    padding: 10,
    gap: 10,
    backgroundColor: "rgba(247, 243, 243, 0.5)",
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
    resizeMode: "contain",
  },
  activityText: {
    fontSize: 14,
    fontFamily: "RobotoMono-Regular",
    color: "#000000",
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
});

export default DetailsScreen;


