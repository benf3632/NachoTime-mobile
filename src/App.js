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
import SearchScreen from "./screens/SearchScreen";

// constants
import colors from "./constants/colors";
import TabBar from "./components/TabBar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "transparentModal",
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
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

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          tabBar={props => <TabBar {...props} />}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Downloads") {
                iconName = "md-download";
              } else if (route.name === "Search") {
                iconName = "search";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              backgroundColor: colors.background_accent,
            },
            headerShown: false,
            tabBarHideOnKeyboard: true,
          })}>
          <Tab.Screen name="Home" component={HomeScreenStack} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Favorites" component={DownloadsScreen} />
          <Tab.Screen name="Downloads" component={DownloadsScreen} />
          <Tab.Screen name="Settings" component={DownloadsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
