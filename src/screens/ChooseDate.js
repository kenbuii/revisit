import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";
import Navbar from "../components/navbar"; // Import Navbar component

const ChooseDate = () => {
  const navigation = useNavigation();

  const [fromDate, setFromDate] = useState({
    month: "",
    day: "",
    year: "",
    time: "",
  });
  const [toDate, setToDate] = useState({
    month: "",
    day: "",
    year: "",
    time: "",
  });

  const handleNext = () => {
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
    navigation.navigate("Confirmation"); // Navigate to the Confirmation screen
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  const renderDateInput = (label, dateState, setDateState) => (
    <View style={styles.dateContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.timeContainer}>
        <TextInput
          style={styles.timeInput}
          placeholder="00:00"
          placeholderTextColor="#999"
          value={dateState.time}
          keyboardType="numeric"
          maxLength={5} // Ensure no more than HH:MM is entered
          onChangeText={(text) => {
            const formattedText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
            let hours = formattedText.slice(0, 2);
            let minutes = formattedText.slice(2, 4);

            if (hours.length === 1 && parseInt(hours) > 2) {
              hours = `0${hours}`; // Add leading 0 if hour is 3-9
            }
            if (hours.length > 2) hours = hours.slice(0, 2); // Keep only the first two digits
            if (minutes.length > 2) minutes = minutes.slice(0, 2); // Keep only the first two digits

            const formattedTime = `${hours}${minutes ? ":" + minutes : ""}`; // Combine hours and minutes
            setDateState({ ...dateState, time: formattedTime });
          }}
        />
      </View>
      <View style={styles.dateInputContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="MM"
          placeholderTextColor="#999"
          value={dateState.month}
          onChangeText={(text) => setDateState({ ...dateState, month: text })}
        />
        <Text style={styles.separator}>/</Text>
        <TextInput
          style={styles.dateInput}
          placeholder="DD"
          placeholderTextColor="#999"
          value={dateState.day}
          onChangeText={(text) => setDateState({ ...dateState, day: text })}
        />
        <Text style={styles.separator}>/</Text>
        <TextInput
          style={styles.dateInput}
          placeholder="YY"
          placeholderTextColor="#999"
          value={dateState.year}
          onChangeText={(text) => setDateState({ ...dateState, year: text })}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>choose your travel dates</Text>
<<<<<<< Updated upstream

        {/* Date inputs */}
        {renderDateInput("from", fromDate, setFromDate)}
        {renderDateInput("to", toDate, setToDate)}

        {/* Confirm button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>confirm</Text>
        </TouchableOpacity>
      </View>

      {/* Navbar at the bottom */}
=======
      </View>

      <View style={styles.dateInputSection}>
        {renderDateInput("from", fromDate, setFromDate)}
        {renderDateInput("to", toDate, setToDate)}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>confirm</Text>
      </TouchableOpacity>

>>>>>>> Stashed changes
      <Navbar
        onStarPress={() => navigation.navigate("Profile")}
        isPlanetActiveOnSearchScreen={false}
        isStarActiveOnProfileScreen={false}
        style={styles.navbar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 20, // Add some margin from the top
  },
  headerTitle: {
    fontFamily: "RobotoMono-Bold",
    fontSize: 24,
    color: "black",
    textAlign: "center",
    textTransform: "lowercase",
  },
  dateInputSection: {
    flex: 1, // Take the remaining vertical space
    justifyContent: "center", // Center the date inputs vertically
    paddingHorizontal: 20,
  },
  dateContainer: {
    alignItems: "center",
    marginBottom: 30, // Add spacing between the two date inputs
  },
  label: {
    fontFamily: "RobotoMono-Bold",
    fontSize: 20,
    textTransform: "lowercase",
    color: "black",
    marginBottom: 15,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  timeInput: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: 100,
    textAlign: "center",
    fontFamily: "RobotoMono-Regular",
    color: "black",
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  dateInput: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: 80,
    textAlign: "center",
    fontFamily: "RobotoMono-Regular",
    color: "black",
  },
  separator: {
    fontSize: 20,
    marginHorizontal: 5,
    color: "black",
  },
  nextButton: {
    backgroundColor: "#E03616",
    alignSelf: "center",
    borderRadius: 25,
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
<<<<<<< Updated upstream
    marginBottom: 20,
=======
    alignSelf: "center",
    width: "60%",
    marginBottom: 20, // Space from the navbar
>>>>>>> Stashed changes
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "RobotoMono-Regular",
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    width: "100%",
    backgroundColor: "white",
  },
<<<<<<< Updated upstream
  headerTitle: {
    fontSize: 20,
    fontFamily: "RobotoMono-Bold",
    color: "black",
    textAlign: "center",
    marginBottom: 30,
    textTransform: "lowercase",
  },
=======
>>>>>>> Stashed changes
});

export default ChooseDate;
