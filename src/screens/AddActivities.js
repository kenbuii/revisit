// route page for adding activities to the editable itinerary

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
import { supabase } from "../services/supabaseClient";
import * as icons from "../assets/icons";
import Navbar from "../components/navbar";
import NavigationConfirmationModal from "../components/NavigationConfirmationModal";

const AddActivities = () => {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([
    { activity_name: "colosseum", activity_type: "location" },
    { activity_name: "pantheon", activity_type: "location" },
    { activity_name: "trevi fountain", activity_type: "location" },
    { activity_name: "roman forum", activity_type: "location" },
    { activity_name: "vatican museums", activity_type: "location" },
    { activity_name: "st peter's basilica", activity_type: "location" },
    { activity_name: "spanish steps", activity_type: "location" },
    { activity_name: "roscioli", activity_type: "restaurant" },
    { activity_name: "armando al pantheon", activity_type: "restaurant" },
    { activity_name: "da enzo al 29", activity_type: "restaurant" },
    { activity_name: "la pergola", activity_type: "restaurant" },
    { activity_name: "pierluigi", activity_type: "restaurant" },
    { activity_name: "salumeria roscioli", activity_type: "restaurant" },
    { activity_name: "il pagliaccio", activity_type: "restaurant" },
    { activity_name: "via condotti", activity_type: "shopping" },
    { activity_name: "via del corso", activity_type: "shopping" },
    { activity_name: "galleria alberto sordi", activity_type: "shopping" },
    { activity_name: "via cola di rienzo", activity_type: "shopping" },
    { activity_name: "porta portese market", activity_type: "shopping" },
    { activity_name: "via dei giubbonari", activity_type: "shopping" }
  ]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "select your attractions",
      headerLeft: () => (
        <HeaderBackButton onPress={() => handleNavigation("goBack")} />
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
    try {
      const { data: cardData } = await supabase
        .from("cards")
        .select("id")
        .eq("userCreated", true)
        .single();

      if (cardData) {
        const activitiesToAdd = selectedActivities.map((activity) => ({
          card_id: cardData.id,
          activity_name: activity.activity_name,
          activity_type: activity.activity_type,
          activity_day: 1, // You might want to make this dynamic
        }));

        const { error } = await supabase
          .from("user_selected_activities")
          .insert(activitiesToAdd);

        if (error) throw error;
        navigation.navigate("EditItinerary");
      }
    } catch (error) {
      console.error("Error saving activities:", error.message);
    }
  };

  const handleNavigation = (destination) => {
    setActiveNavItem(destination);
    setPendingNavigation(destination);
    setShowExitModal(true);
  };

  const handleConfirmNavigation = () => {
    if (pendingNavigation === "goBack") {
      navigation.goBack();
    } else if (pendingNavigation) {
      navigation.navigate(pendingNavigation);
    }
    setShowExitModal(false);
    setPendingNavigation(null);
    setActiveNavItem(null);
  };

  const handleStay = () => {
    setShowExitModal(false);
    setPendingNavigation(null);
    setActiveNavItem(null);
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
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Image source={icons.add} style={styles.addIcon} />
            <Text style={styles.addButtonText}>Add my own</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {selectedActivities.length > 0 && (
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>confirm</Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.addModalContainer}>
          <View style={styles.addModalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Image source={icons.exit} style={styles.exitIcon} />
              </TouchableOpacity>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton}>
                  <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <NavigationConfirmationModal
        visible={showExitModal}
        onRequestClose={() => setShowExitModal(false)}
        onStay={handleStay}
        onLeave={handleConfirmNavigation}
      />

      <Navbar
        onPlanetPress={() => handleNavigation("Search")}
        onAddPress={() => handleNavigation("CreateItinerary")}
        onStarPress={() => handleNavigation("Profile")}
        isPlanetActiveOnSearchScreen={activeNavItem === "Search"}
        isAddActiveOnOtherScreens={activeNavItem === "CreateItinerary"}
        isStarActiveOnProfileScreen={activeNavItem === "Profile"}
      />
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
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    borderWidth: 1.5,
    borderColor: "#959191",
    alignSelf: "flex-start",
  },
  addIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  addButtonText: {
    fontFamily: "RobotoMono-Regular",
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#E03616",
    alignSelf: "center",
    borderRadius: 25,
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  confirmText: {
    color: "white",
    fontFamily: "RobotoMono-Regular",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  exitIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: "#959191",
    resizeMode: "contain",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#959191",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#E03616",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  searchButtonText: {
    color: "white",
    fontFamily: "RobotoMono-Regular",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  stayButton: {
    backgroundColor: "#E03616",
    borderRadius: 25,
  },
  leaveButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E03616",
    borderRadius: 25,
  },
  modalButtonText: {
    textAlign: "center",
    fontFamily: "RobotoMono-Bold",
    fontSize: 16,
  },
  stayButtonText: {
    color: "white",
  },
  leaveButtonText: {
    color: "#E03616",
  },
  addModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  addModalContent: {
    width: "100%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: "auto",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-start",
  },
  modalText: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "RobotoMono-Bold",
    color: "#959191",
  },
});

export default AddActivities;
