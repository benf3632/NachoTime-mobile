import { createSlice } from "@reduxjs/toolkit";

// helpers
import { fetchMoviesByFilter } from "../helper/yts";

const initialState = {
  download_count: {
    movies: [],
    page: 0,
  },
  rating: {
    movies: [],
    page: 0,
  },
  date_added: {
    movies: [],
    page: 0,
  },
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMoviesByFilter: async (state, action) => {
      const movies = await fetchMoviesByFilter(action.payload.filter, 1, 1);
      console.log(movies[0]);
      state[action.payload.filter].movies = movies;
      state[action.payload.filter].page = 1;
    },
    // addMovies: (state, action) => {
    //   state.movies = state.movies.concat(action.payload);
    // },
    // incrementPage: state => {
    //   state.page += 1;
    // },
    // setPage: (state, action) => {
    //   state.page = action.payload;
    // },
  },
});

// export const selectMovies = state => state.movies.movies;
// export const selectPage = state => state.movies.page;
export const selectPopularMovies = state => state.movies["download_count"];

export const { getMoviesByFilter, addMovies, setPage, incrementPage } =
  moviesSlice.actions;

export default moviesSlice.reducer;
