import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const DetailsScreen = ({ route }) => {
  // Extract the data passed via navigation
  const { title, image, username, likes } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display the image */}
      <Image source={image} style={styles.image} />

      {/* Display the title */}
      <Text style={styles.title}>{title}</Text>

      {/* Display the username and likes */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>By: {username}</Text>
        <Text style={styles.infoText}>Likes: {likes}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  infoContainer: {
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
});

export default DetailsScreen;


