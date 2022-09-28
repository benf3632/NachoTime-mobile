import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import VideoScreen from "@app/screens/VideoScreen";

// navigators
import MainAppTabNavigator from "@app/navigators/MainAppTabNavigator";
import ShowDetailsModal from "@app/components/ShowDetailsModal";

const Main = createStackNavigator();

function MainNavigator() {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Main.Group>
        <Main.Screen name="MainApp" component={MainAppTabNavigator} />
        <Main.Screen name="Video" component={VideoScreen} />
      </Main.Group>
      <Main.Group screenOptions={{ presentation: "modal" }}>
        <Main.Screen name="Details" component={ShowDetailsModal} />
      </Main.Group>
    </Main.Navigator>
  );
}

export default MainNavigator;
