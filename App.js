import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

// icons
import Ionicons from "react-native-vector-icons/Ionicons";

import { store } from "./store";

// screens
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import { BlurView } from "@react-native-community/blur";

const Stack = createNativeStackNavigator();

const HomeScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DetailsScreen"
        component={DetailsScreen}
      />
    </Stack.Navigator>
  );
};

const DownloadsScreen = () => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Downloads") {
                iconName = "md-download";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              backgroundColor: "#3D3F43FF",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              position: "absolute",
              overflow: "hidden",
            },
            headerShown: false,
          })}>
          <Tab.Screen name="Home" component={HomeScreenStack} />
          <Tab.Screen name="Downloads" component={DownloadsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
