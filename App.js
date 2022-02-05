import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { store } from "./store";

// screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from "./screens/DetailsScreen";


const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
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
			</NavigationContainer>
		</Provider>
	);
};

export default App;
