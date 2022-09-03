import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { persistor, store } from "./store";

// MainApp
import MainApp from "./MainApp";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainApp />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
