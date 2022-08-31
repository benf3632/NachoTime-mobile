import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// navigators
import HomeNavigator from "./HomeNavigator";

// screens
import SearchScreen from "@app/screens/SearchScreen";
import ComingSoonScreen from "@app/screens/ComingSoonScreen";

// components
import TabBar from "@app/components/TabBar";

const Tab = createBottomTabNavigator();

const MainAppTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={() => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorites" component={ComingSoonScreen} />
      <Tab.Screen name="Downloads" component={ComingSoonScreen} />
      <Tab.Screen name="Settings" component={ComingSoonScreen} />
    </Tab.Navigator>
  );
};

export default MainAppTabNavigator;
