import React, { useState, useEffect } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from "../services/supabaseClient";

const InviteCollaborators = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedItems } = route.params; // Get selected items from the previous screen

  const [collaborators, setCollaborators] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCollaborators, setFilteredCollaborators] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  useEffect(() => {
    // Fetch collaborators based on card data
    const fetchCollaborators = async () => {
      const { data, error } = await supabase
        .from("cards")
        .select("username, profileImageUrl") // Adjust fields as per your table structure
        .in("id", selectedItems); // Filter by selected item IDs

      if (error) {
        console.error("Error fetching collaborators:", error.message);
        return;
      }

      setCollaborators(data);
      setFilteredCollaborators(data); // Initialize filtered list
    };

    fetchCollaborators();
  }, [selectedItems]);

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
      Alert.alert("No Collaborators Selected", "Please select at least one collaborator.");
      return;
    }

    // Navigate to the next screen, passing selected collaborators
    navigation.navigate("NextScreen", { selectedCollaborators });
  };

  const renderCollaborator = ({ item }) => (
    <TouchableOpacity
      style={styles.collaboratorContainer}
      onPress={() => toggleCollaboratorSelection(item.username)}
    >
      <View style={styles.profileInfo}>
        <Image source={{ uri: item.profileImageUrl }} style={styles.profileImage} />
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <Text style={styles.checkbox}>
        {selectedCollaborators.includes(item.username) ? "✔️" : "⬜️"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Invite Collaborators</Text>
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

export default InviteCollaborators;
