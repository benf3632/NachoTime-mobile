import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import HomeScreen from "@app/screens/HomeScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
