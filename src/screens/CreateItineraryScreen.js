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
import { supabase } from "../services/supabaseClient";
import { useNavigation } from "@react-navigation/native";

const CreateItineraryScreen = () => {
  const [starredItems, setStarredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigation = useNavigation();

  // Fetch starred items from the database
  const fetchStarredItems = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq("myStar", true); // Assuming "myStar" marks the starred items

    if (error) {
      console.error("Error fetching starred items:", error.message);
    } else {
      setStarredItems(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStarredItems();
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
      Alert.alert("No Items Selected", "Please select at least one item to proceed.");
      return;
    }

    // Navigate to InviteCollaborators screen and pass selected items
    navigation.navigate("InviteCollaborators", { selectedItems });
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
      <Text style={styles.header}>Where would you like to go?</Text>
      <Text style={styles.subheader}>(Multi-select available)</Text>
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
      <TouchableOpacity style={styles.nextButton} onPress={goToInviteCollaborators}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subheader: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
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
    fontSize: 16,
    textAlign: "center",
    color: "black",
  },
  selectedOptionText: {
    color: "#E03616",
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#E03616",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateItineraryScreen;
