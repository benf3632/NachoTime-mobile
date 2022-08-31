import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import VideoScreen from "@app/screens/VideoScreen";

// navigators
import MainAppTabNavigator from "@app/navigators/MainAppTabNavigator";

const Main = createNativeStackNavigator();

function MainNavigator() {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Main.Screen name="MainApp" component={MainAppTabNavigator} />
      <Main.Screen name="Video" component={VideoScreen} />
    </Main.Navigator>
  );
}

export default MainNavigator;
