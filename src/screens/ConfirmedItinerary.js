// This is the FINAL CONFIRMED ITINERARY SCREEN

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Share,
  ScrollView,
  TimePickerAndroid,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
import { checkmark, download, share, edit } from "../assets/icons";
import Navbar from "../components/navbar";
import { supabase } from "../services/supabaseClient";
import * as icons from "../assets/icons";

const ConfirmedItinerary = () => {
  const navigation = useNavigation();
  const [userCard, setUserCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [expandedDay, setExpandedDay] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [activities, setActivities] = useState({});

  const fetchUserCreatedCards = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("cards")
        .select("*, location")
        .eq("userCreated", true)
        .single();

      if (error) throw error;
      setUserCard(data);

      // Fetch activities for this card
      const { data: activitiesData, error: activitiesError } = await supabase
        .from("user_selected_activities")
        .select("*")
        .eq("card_id", data.id)
        .order("activity_day", { ascending: true });

      if (activitiesError) throw activitiesError;

      // Group activities by day
      const groupedActivities = activitiesData.reduce((acc, activity) => {
        acc[activity.activity_day] = acc[activity.activity_day] || [];
        acc[activity.activity_day].push(activity);
        return acc;
      }, {});

      setActivities(groupedActivities);
    } catch (error) {
      console.error("Error fetching card:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCreatedCards();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out my itinerary!",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleMaximize = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
    setEditingActivity(null); // Reset editing state when collapsing
  };

  const handleTimeEdit = async (activityId, currentTime) => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: parseInt(currentTime.split(":")[0]),
        minute: parseInt(currentTime.split(":")[1]),
        is24Hour: false,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Update the time in your activities state
        const newTime = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        // Update state logic here
      }
    } catch (error) {
      console.warn("Cannot open time picker", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          {/* <Text style={styles.header}>final itinerary: </Text> */}
          {userCard && userCard.location && (
            <Text style={styles.location}>{userCard.location}</Text>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {userCard && (
          <>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: userCard.imageUrl }}
                style={styles.mainImage}
              />
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditItinerary")}
              >
                <Image source={icons.orangeEdit} style={styles.actionIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDownloadModalVisible(true)}>
                <Image source={icons.download} style={styles.actionIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare}>
                <Image source={icons.share} style={styles.actionIcon} />
              </TouchableOpacity>
            </View>

            {Object.entries(activities).map(([day, dayActivities]) => (
              <View
                key={day}
                style={[
                  styles.daySection,
                  expandedDay === day && styles.expandedDaySection,
                ]}
              >
                <View style={styles.dayHeader}>
                  <Text style={styles.dayText}>{day}/19/25</Text>
                  <TouchableOpacity
                    style={styles.maximizeButton}
                    onPress={() => handleMaximize(day)}
                  >
                    <Image
                      source={
                        expandedDay === day ? icons.minimize : icons.maximize
                      }
                      style={styles.maximizeIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.activitiesList}>
                  {expandedDay === day ? (
                    <View>
                      {day === "1" ? (
                        <>
                          <Text>
                            <Text
                              style={[styles.activityText, styles.boldTime]}
                            >
                              8:30AM - 11:00AM:
                            </Text>
                            <Text style={styles.activityText}>
                              {
                                "\nSt. Peter's Basilica. Arrive early to beat the crowds! Don't miss Michelangelo's Pietà and climb the dome for panoramic views of Rome. Remember to dress modestly - shoulders and knees must be covered."
                              }
                            </Text>
                          </Text>
                          <Text style={styles.activityText}>{"\n"}</Text>
                          <Text>
                            <Text
                              style={[styles.activityText, styles.boldTime]}
                            >
                              11:30AM - 2:00PM:
                            </Text>
                            <Text style={styles.activityText}>
                              {
                                "\nThe Colosseum. Pre-book your tickets to avoid long lines. Explore the amphitheater and learn about gladiatorial contests. The underground level tours are fascinating if available."
                              }
                            </Text>
                          </Text>
                          <Text style={styles.activityText}>{"\n"}</Text>
                          <Text>
                            <Text
                              style={[styles.activityText, styles.boldTime]}
                            >
                              2:30PM - 5:00PM:
                            </Text>
                            <Text style={styles.activityText}>
                              {
                                "\nThe Roman Forum. Right next to the Colosseum, explore the heart of ancient Rome. Don't miss the Temple of Saturn, House of the Vestals, and Arch of Titus. Consider getting a guided tour to fully understand the historical significance."
                              }
                            </Text>
                          </Text>
                        </>
                      ) : day === "2" ? (
                        <>
                          <Text>
                            <Text
                              style={[styles.activityText, styles.boldTime]}
                            >
                              12:30PM - 2:00PM:
                            </Text>
                            <Text style={styles.activityText}>
                              {
                                "\nLunch at Pizzeria da Baffetto. This beloved Roman institution is famous for their thin-crust Roman-style pizza. Try their classic Margherita or the house special with mushrooms."
                              }
                            </Text>
                          </Text>
                          <Text style={styles.activityText}>{"\n"}</Text>
                          <Text>
                            <Text
                              style={[styles.activityText, styles.boldTime]}
                            >
                              2:30PM - 4:30PM:
                            </Text>
                            <Text style={styles.activityText}>
                              {
                                "\nShopping at La Rinascente. This upscale department store offers Italian and international brands. Don't miss the rooftop terrace for great views of the city."
                              }
                            </Text>
                          </Text>
                          <Text style={styles.activityText}>{"\n"}</Text>
                          <Text>
                            <Text
                              style={[styles.activityText, styles.boldTime]}
                            >
                              5:00PM - 7:30PM:
                            </Text>
                            <Text style={styles.activityText}>
                              {
                                "\nVilla Borghese. End your day with a peaceful stroll through Rome's most beautiful park. Visit the Borghese Gallery (advance booking required), rent a rowboat on the lake, or simply enjoy the gardens. Perfect for sunset!"
                              }
                            </Text>
                          </Text>
                        </>
                      ) : (
                        dayActivities
                          .map((activity) => activity.activity_name)
                          .join("\n")
                      )}
                    </View>
                  ) : (
                    dayActivities.map((activity) => (
                      <View key={activity.id} style={styles.activityItem}>
                        <Text style={styles.activityText}>
                          {activity.activity_name}
                        </Text>
                      </View>
                    ))
                  )}
                </View>
                {expandedDay === day && (
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setEditingActivity(true)}
                  >
                    <Image source={icons.textEdit} style={styles.editIcon} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </>
        )}
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Image source={icons.exit} style={styles.exitIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Existing Download Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={downloadModalVisible}
        onRequestClose={() => setDownloadModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              your itinerary has been saved to your camera roll!
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setDownloadModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>yippee!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.navbarContainer}>
        <Navbar
          onPlanetPress={() => navigation.navigate("Search")}
          isPlanetActiveOnSearchScreen={false}
          isStarActiveOnProfileScreen={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontSize: 16,
    fontFamily: "RobotoMono-Bold",
  },
  location: {
    fontSize: 20,
    fontFamily: "RobotoMono-Bold",
    color: "#E03616",
  },
  imageContainer: {
    width: 350,
    resizeMode: "cover",
    marginBottom: 10,
  },
  mainImage: {
    width: 360,
    height: 100,
    resizeMode: "cover",
    borderRadius: 20,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 15,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10,
  },
  actionIcon: {
    width: 24,
    height: 24,
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
    borderWidth: 3,
    borderColor: "#E03616",
  },
  modalText: {
    fontFamily: "RobotoMono-Regular",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "black",
  },
  modalButton: {
    backgroundColor: "#E03616",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  modalButtonText: {
    color: "white",
    fontFamily: "RobotoMono-Bold",
    fontSize: 14,
  },
  navbarContainer: {
    width: "100%",
    backgroundColor: "white",
  },
  daySection: {
    width: "95%",
    borderWidth: 1,
    borderColor: "#959191",
    borderRadius: 20,
    backgroundColor: "white",
    padding: 20,
    marginBottom: 15,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  dayText: {
    fontSize: 18,
    fontFamily: "RobotoMono-Bold",
  },
  maximizeButton: {
    padding: 5,
  },
  maximizeIcon: {
    width: 20,
    height: 20,
  },
  activitiesList: {
    width: "100%",
  },
  activityItem: {
    marginBottom: 12,
  },
  activityText: {
    fontFamily: "RobotoMono-Regular",
    fontSize: 14,
  },
  expandedDaySection: {
    minHeight: 300,
    zIndex: 1000,
    elevation: 5,
    position: "relative",
  },
  editButton: {
    position: "absolute",
    bottom: 10,
    right: 20,
    padding: 5,
    zIndex: 1001,
  },
  editIcon: {
    width: 20,
    height: 20,
    color: "#959191",
  },
  boldTime: {
    fontFamily: "RobotoMono-Bold",
    fontSize: 14,
  },
});

export default ConfirmedItinerary;
