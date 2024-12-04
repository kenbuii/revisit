// route page for adding activities to the editable itinerary

import { View, Text, StyleSheet } from "react-native";

const AddActivities = () => {
  return (
    <View style={styles.container}>
      <Text>Add Activities</Text> {/* placeholder text */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default AddActivities;