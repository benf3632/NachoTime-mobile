import { configureStore } from "@reduxjs/toolkit";

// slices
import moviesSlice from "./slices/moviesSlice";

// services
import { ytsApi } from "./services/ytsApi";

export const store = configureStore({
  reducer: {
    // movies: moviesSlice,
    [ytsApi.reducerPath]: ytsApi.reducer,
  },
});
