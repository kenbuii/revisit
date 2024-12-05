import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
//import { supabase } from "../services/supabaseClient";
import * as icons from "../assets/icons";

const SelectAttractions = () => {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([
    { activity_name: "Fisherman's Wharf", activity_type: "location" },
    { activity_name: "MoMA", activity_type: "location" },
    { activity_name: "Pier Market Seafood", activity_type: "restaurant" },
    { activity_name: "V Boutique", activity_type: "shopping" },
    { activity_name: "Little Italy", activity_type: "location" },
    { activity_name: "Golden Gate Bridge", activity_type: "location" },
    { activity_name: "Sausalito", activity_type: "location" },
    { activity_name: "Barrel House Tavern", activity_type: "restaurant" },
    { activity_name: "Chinatown", activity_type: "location" },
    { activity_name: "Land of the Sun", activity_type: "shopping" },
    { activity_name: "Love on Haight", activity_type: "location" },
    { activity_name: "Nopalito", activity_type: "restaurant" },
    { activity_name: "Oracle Park", activity_type: "location" },
    { activity_name: "La Rinascente", activity_type: "location" },
    { activity_name: "St.Peter's Basilicia", activity_type: "location" },
    { activity_name: "The Coliseum", activity_type: "location" },
    { activity_name: "The Forum", activity_type: "location" },
    { activity_name: "Pizzeria de Baffeto", activity_type: "location" },
    { activity_name: "Villa Borghese", activity_type: "location" },
  ]);
  const [selectedActivities, setSelectedActivities] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  const toggleActivity = (activity) => {
    setSelectedActivities((prev) => {
      if (prev.includes(activity)) {
        return prev.filter((a) => a !== activity);
      }
      return [...prev, activity];
    });
  };

  const handleConfirm = async () => {
    // try {
    //   const { data: cardData } = await supabase
    //     .from("cards")
    //     .select("id")
    //     .eq("userCreated", true)
    //     .single();

    //   if (cardData) {
    //     const activitiesToAdd = selectedActivities.map((activity) => ({
    //       card_id: cardData.id,
    //       activity_name: activity.activity_name,
    //       activity_type: activity.activity_type,
    //       activity_day: 1, // You might want to make this dynamic
    //     }));

    //     const { error } = await supabase
    //       .from("user_selected_activities")
    //       .insert(activitiesToAdd);

    //     if (error) throw error;

    //     // Navigate to ChooseDate screen
    navigation.navigate("ChooseDate");
    //   }
    // } catch (error) {
    //   console.error("Error saving activities:", error.message);
    // }
  };

  const renderActivityIcon = (type) => {
    switch (type) {
      case "location":
        return icons.location;
      case "restaurant":
        return icons.food;
      case "shopping":
        return icons.shopping;
      default:
        return icons.location;
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <Text style={styles.heading}>select your attractions</Text>
        </View>
        <View style={styles.buttonContainer}>
          {activities.map((activity, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.activityButton,
                selectedActivities.includes(activity) && styles.selectedButton,
              ]}
              onPress={() => toggleActivity(activity)}
            >
              <Image
                source={renderActivityIcon(activity.activity_type)}
                style={[
                  styles.icon,
                  selectedActivities.includes(activity) && styles.selectedIcon,
                ]}
              />
              <Text
                style={[
                  styles.activityText,
                  selectedActivities.includes(activity) && styles.selectedText,
                ]}
              >
                {activity.activity_name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedActivities.length > 0 && (
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>confirm</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  activityButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "#959191",
    alignSelf: "flex-start",
  },
  selectedButton: {
    backgroundColor: "#E03616",
    borderWidth: 0,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: "#959191",
    resizeMode: "contain",
  },
  selectedIcon: {
    tintColor: "white",
  },
  activityText: {
    fontFamily: "RobotoMono-Regular",
    fontSize: 14,
    color: "black",
  },
  selectedText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-start",
  },
  confirmButton: {
    backgroundColor: "#E03616",
    alignSelf: "center",
    borderRadius: 25,
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  confirmText: {
    color: "white",
    fontFamily: "RobotoMono-Regular",
    fontSize: 18,
  },
  heading: {
    fontSize: 20,
    fontFamily: "RobotoMono-Bold",
    color: "black",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default SelectAttractions;
