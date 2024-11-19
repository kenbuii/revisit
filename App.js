import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./src/screens/SearchScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

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
      <Stack.Navigator>
        {/* Search Screen with no header */}
        <Stack.Screen
          name="Search"
          component={SearchScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

