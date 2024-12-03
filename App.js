import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./src/screens/SearchScreen";
import Profile from "./src/screens/Profile";
import DetailsScreen from "./src/screens/DetailsScreen";
import Itinerary from "./src/screens/DayDetail";
import ActivityDetail from "./src/screens/ActivityDetail"; // Corrected path for ActivityDetail
import CreateItineraryScreen from "./src/screens/CreateItineraryScreen.js"; // Import the new CreateItineraryScreen
import InviteCollaborators from "./src/screens/InviteCollaborators.js"; // Import the InviteCollaborators screen
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { supabase } from "./src/services/supabaseClient";

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    RobotoSerif: require("./src/assets/fonts/Roboto_Serif/static/RobotoSerif-Regular.ttf"),
    "RobotoSerif-Bold": require("./src/assets/fonts/Roboto_Serif/static/RobotoSerif-Bold.ttf"),
    RobotoMono: require("./src/assets/fonts/Roboto_Mono/static/RobotoMono-Regular.ttf"),
    "RobotoMono-Bold": require("./src/assets/fonts/Roboto_Mono/static/RobotoMono-Bold.ttf"),
    "RobotoMono-Medium": require("./src/assets/fonts/Roboto_Mono/static/RobotoMono-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false, // Disable swipe gestures for all screens
          animationEnabled: false, // Disable transitions
          gestureDirection: "horizontal", // Disable horizontal swipe gestures on iOS and Android
        }}
      >
        {/* Search Screen with no header */}
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />

        {/* Details Screen with a default header */}
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: "", // Optionally set the title to an empty string
            headerStyle: { backgroundColor: "#FFFFFF" }, // Customize header background color
            headerTintColor: "black", // Set Back Button color
            headerTitleStyle: { fontFamily: "RobotoMono-Medium", fontSize: 16 }, // Optional header text styling
          }}
        />

        {/* Itinerary Screen */}
        <Stack.Screen
          name="Itinerary"
          component={Itinerary}
          options={{
            title: "Itinerary",
            headerStyle: { backgroundColor: "#FFFFFF" }, // Customize header background color
            headerTintColor: "black", // Set Back Button color
            headerTitleStyle: { fontFamily: "RobotoMono-Bold", fontSize: 20 }, // Customize title style
          }}
        />

        {/* ActivityDetail Screen */}
        <Stack.Screen
          name="ActivityDetail"
          component={ActivityDetail}
          options={{
            title: "Activity Detail",
            headerStyle: { backgroundColor: "#FFFFFF" }, // Customize header background color
            headerTintColor: "black", // Set Back Button color
            headerTitleStyle: { fontFamily: "RobotoMono-Bold", fontSize: 20 }, // Customize title style
          }}
        />

        {/* CreateItineraryScreen */}
        <Stack.Screen
          name="CreateItinerary"
          component={CreateItineraryScreen}
          options={{
            title: "Create Itinerary",
            headerStyle: { backgroundColor: "#FFFFFF" }, // Customize header background color
            headerTintColor: "black", // Set Back Button color
            headerTitleStyle: { fontFamily: "RobotoMono-Bold", fontSize: 20 }, // Customize title style
          }}
        />

        {/* InviteCollaborators Screen */}
        <Stack.Screen
          name="InviteCollaborators"
          component={InviteCollaborators}
          options={{
            title: "Invite Collaborators",
            headerStyle: { backgroundColor: "#FFFFFF" }, // Customize header background color
            headerTintColor: "black", // Set Back Button color
            headerTitleStyle: { fontFamily: "RobotoMono-Bold", fontSize: 20 }, // Customize title style
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

