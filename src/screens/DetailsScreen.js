import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const cards = [
  {
    id: "1",
    title: "around Golden Gate 🌟 SF local foods, exploring sausalito",
    image: require("../assets/media/sfGolden.jpg"),
    username: "emilyinsf",
    likes: 289,
  },
  {
    id: "2",
    title: "rome - must visits ✈️",
    image: require("../assets/media/rome.jpeg"),
    username: "strawberry981",
    likes: 530,
  },
  {
    id: "3",
    title: "tokyo food tour 🍣 - taste of japan",
    image: require("../assets/media/japan.jpeg"),
    username: "sampow11",
    likes: 192,
  },
  {
    id: "4",
    title: "🗽 a walk through manhattan - new york sight seeing",
    image: require("../assets/media/manhattan.jpeg"),
    username: "worldoftshirts",
    likes: 48,
  },
];

const SearchScreen = ({ navigation }) => {
  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Details", { card: item })}
    >
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.cardDetails}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.likes}>{item.likes} likes</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore</Text>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.cardList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  cardList: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#F7F3F3",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    overflow: "hidden",
  },
  cardImage: {
    height: Dimensions.get("window").width / 2 - 20,
    width: "100%",
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    margin: 8,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  username: {
    fontSize: 10,
    color: "gray",
  },
  likes: {
    fontSize: 10,
    color: "gray",
  },
});

export default SearchScreen;
