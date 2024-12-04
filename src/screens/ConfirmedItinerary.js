// This is the confirmed itinerary screen, after EditItinerary has been used
//TODO: add functionality for download and share

import { View, Text, Image, StyleSheet } from "react-native";
import { checkmark } from "../assets/icons";

const ConfirmedItinerary = () => {
  return (
    <View style={styles.container}>
      <Image source={checkmark} />
      <Text>Itinerary Confirmed!</Text> {/* placeholder text */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ConfirmedItinerary;
