import React from "react";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { store } from "./store";

// MainApp
import MainApp from "./MainApp";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <MainApp />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
