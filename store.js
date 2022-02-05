import { configureStore } from '@reduxjs/toolkit';

// slices
import moviesSlice from './slices/moviesSlice';

export const store = configureStore({
	reducer: {
		movies: moviesSlice,
	},
});
