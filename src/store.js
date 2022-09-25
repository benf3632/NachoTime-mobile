import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";

// reactotron
import Reactotron from "../ReactotronConfig";

// slices
import moviesSlice from "./slices/moviesSlice";
import downloadsSlice from "./slices/downloadsSlice";
import showsSlice from "./slices/showsSlice";

// services
import { ytsApi } from "./services/ytsApi";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["downloads"],
};

const rootReducer = combineReducers({
  movies: moviesSlice,
  downloads: downloadsSlice,
  shows: showsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  enhancers: [Reactotron.createEnhancer()],
});

export const persistor = persistStore(store);
