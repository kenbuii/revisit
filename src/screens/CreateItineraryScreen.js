import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/navbar";
import { HeaderBackButton } from "@react-navigation/elements";
import NavigationConfirmationModal from "../components/NavigationConfirmationModal";

const CreateItineraryScreen = () => {
  const [starredItems, setStarredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  // Set hardcoded starred items
  useEffect(() => {
    const hardcodedItems = [
      { id: 1, title: "new york" },
      { id: 2, title: "san francisco" },
      { id: 3, title: "rome" },
      { id: 4, title: "estonia" },
      { id: 5, title: "france" },
      { id: 6, title: "search for more" }, //TODO: IF clicked, opens up search screen
    ];
    setStarredItems(hardcodedItems);
    setIsLoading(false);
  }, []);

  const toggleSelection = (item) => {
    if (selectedItems.includes(item.id)) {
      // Deselect item
      setSelectedItems(selectedItems.filter((id) => id !== item.id));
    } else {
      // Select item
      setSelectedItems([...selectedItems, item.id]);
    }
  };

  const goToInviteCollaborators = () => {
    if (selectedItems.length === 0) {
      Alert.alert(
        "No Items Selected",
        "Please select at least one item to proceed."
      );
      return;
    }

    // Navigate to InviteCollaborators screen and pass selected items
    navigation.navigate("InviteCollaborators", { selectedItems });
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.option,
        selectedItems.includes(item.id) && styles.selectedOption,
      ]}
      onPress={() => toggleSelection(item)}
    >
      <Text
        style={[
          styles.optionText,
          selectedItems.includes(item.id) && styles.selectedOptionText,
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>where would you like to go?</Text>
      <Text style={styles.subheader}></Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#E03616" />
      ) : (
        <FlatList
          data={starredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={goToInviteCollaborators}
      >
        <Text style={styles.nextButtonText}>next</Text>
      </TouchableOpacity>

      <NavigationConfirmationModal
        visible={showExitModal}
        onRequestClose={() => setShowExitModal(false)}
        onStay={handleStay}
        onLeave={handleConfirmNavigation}
      />
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
  subheader: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
    fontFamily: "RobotoMono-Regular",
  },
  list: {
    paddingBottom: 20,
  },
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    justifyContent: "center",
  },
  selectedOption: {
    borderColor: "#E03616",
    backgroundColor: "#FFF3F3",
  },
  optionText: {
    fontSize: 15,
    textAlign: "center",
    color: "black",
    fontFamily: "RobotoMono-Regular",
  },
  selectedOptionText: {
    color: "#E03616",
    fontWeight: "bold",
    fontFamily: "RobotoMono-Regular",
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

export default CreateItineraryScreen;
