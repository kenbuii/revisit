import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon"; // Confetti effect library

const Confirmation = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti after a slight delay to simulate a confirmation process
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>generating your itinerary</Text>
      <Text style={styles.subText}>for your selected dates</Text>

      {/* Loader to indicate progress */}
      <ActivityIndicator size="large" color="#E03616" style={styles.loader} />

      {/* Confetti effect */}
      {showConfetti && <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 20,
    fontFamily: "RobotoMono-Bold",
    color: "black",
    textTransform: "lowercase",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    fontFamily: "RobotoMono-Regular",
    color: "black",
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});

export default Confirmation;
