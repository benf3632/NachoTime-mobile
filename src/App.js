import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// icons
import Ionicons from "react-native-vector-icons/Ionicons";

import { store } from "./store";

// screens
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import VideoScreen from "./screens/VideoScreen";

// constants
import colors from "./constants/colors";
import TabBar from "./components/TabBar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Main = createNativeStackNavigator();

const HomeNavigator = () => {
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

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={() => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorites" component={DownloadsScreen} />
      <Tab.Screen name="Downloads" component={DownloadsScreen} />
      <Tab.Screen name="Settings" component={DownloadsScreen} />
    </Tab.Navigator>
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer theme={navTheme}>
          <Main.Navigator
            screenOptions={{
              headerShown: false,
              presentation: "transparentModal",
            }}>
            <Main.Screen name="App" component={TabNavigator} />
            <Main.Screen name="Video" component={VideoScreen} />
          </Main.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
