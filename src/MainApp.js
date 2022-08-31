import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

// constants
import colors from "@app/constants/colors";

// navigator
import MainNavigator from "@app/navigators/MainNavigator";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

const MainApp = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default MainApp;
