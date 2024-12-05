import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/navbar";
import NavigationConfirmationModal from "../components/NavigationConfirmationModal";

const InviteCollaborators = () => {
  const navigation = useNavigation();

  // Hardcoded collaborators
  const collaborators = [
    {
      username: "world_ofshirts",
      profileImageUrl: "https://via.placeholder.com/40",
    },
    {
      username: "janeromero",
      profileImageUrl: "https://via.placeholder.com/40",
    },
    {
      username: "_danjones",
      profileImageUrl: "https://via.placeholder.com/40",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCollaborators, setFilteredCollaborators] =
    useState(collaborators);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  const toggleCollaboratorSelection = (username) => {
    if (selectedCollaborators.includes(username)) {
      setSelectedCollaborators((prev) =>
        prev.filter((collab) => collab !== username)
      );
    } else {
      setSelectedCollaborators((prev) => [...prev, username]);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredCollaborators(collaborators);
    } else {
      const filtered = collaborators.filter((collab) =>
        collab.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCollaborators(filtered);
    }
  };

  const goToNextScreen = () => {
    if (selectedCollaborators.length === 0) {
      Alert.alert(
        "No Collaborators Selected",
        "Please select at least one collaborator."
      );
      return;
    }

    // Navigate to the SelectAttractions screen, passing selected collaborators
    navigation.navigate("SelectAttractions", { selectedCollaborators });
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

  const renderCollaborator = ({ item }) => (
    <TouchableOpacity
      style={styles.collaboratorContainer}
      onPress={() => toggleCollaboratorSelection(item.username)}
    >
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: item.profileImageUrl }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <Text style={styles.checkbox}>
        {selectedCollaborators.includes(item.username) ? "✔️" : "⬜️"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>invite collaborators</Text>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search collaborators"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredCollaborators}
        renderItem={renderCollaborator}
        keyExtractor={(item) => item.username}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.nextButton} onPress={goToNextScreen}>
        <Text style={styles.nextButtonText}>next</Text>
      </TouchableOpacity>

      <NavigationConfirmationModal
        visible={showExitModal}
        onRequestClose={() => setShowExitModal(false)}
        onStay={handleStay}
        onLeave={handleConfirmNavigation}
      />

      {/* <Navbar
        onPlanetPress={() => handleNavigation("Search")}
        onAddPress={() => handleNavigation("CreateItinerary")}
        onStarPress={() => handleNavigation("Profile")}
        isPlanetActiveOnSearchScreen={activeNavItem === "Search"}
        isAddActiveOnOtherScreens={activeNavItem === "CreateItinerary"}
        isStarActiveOnProfileScreen={activeNavItem === "Profile"}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 20,
    fontFamily: "RobotoMono-Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  collaboratorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
  },
  checkbox: {
    fontSize: 20,
  },
  nextButton: {
    backgroundColor: "#E03616",
    alignSelf: "center",
    borderRadius: 25,
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "RobotoMono-Regular",
  },
});

export default InviteCollaborators;
