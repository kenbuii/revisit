// App.js
import React, { useCallback } from "react";
import "react-native-get-random-values";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./src/screens/SearchScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
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
          headerShown: false,
        }}
      >
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
