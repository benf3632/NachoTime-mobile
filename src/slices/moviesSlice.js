import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helpers
import { fetchMoviesByFilter } from "../helper/yts";

const initialState = {
  download_count: {
    movies: [],
    page: 0,
    loading: false,
    error: "",
    hasMore: true,
  },
  rating: {
    movies: [],
    page: 0,
    loading: false,
    error: "",
    hasMore: true,
  },
  date_added: {
    movies: [],
    page: 0,
    loading: false,
    error: "",
    hasMore: true,
  },
  loadedInitialState: false,
};

export const getMoviesByFilter = createAsyncThunk(
  "movies/getMoviesByFilter",
  async (filter, thunkApi) => {
    const movies = await fetchMoviesByFilter(filter, 1, 10);
    // console.log(movies);
    return movies;
  },
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMoviesByFilter.pending, (state, action) => {
        state[action.meta.arg].loading = true;
      })
      .addCase(getMoviesByFilter.fulfilled, (state, action) => {
        const movies_filter = action.meta.arg;

        state[movies_filter].loading = false;
        state[movies_filter].movies = state[movies_filter].movies.concat(
          action.payload,
        );
        state[movies_filter].page = 1;
        if (action.payload.length === 0) state[movies_filter].hasMore = false;
        state.loadedInitialState = true;
      });
  },
});

// export const selectMovies = state => state.movies.movies;
// export const selectPage = state => state.movies.page;
export const selectPopularMovies = state => state.movies["download_count"];
export const selectRatedMovies = state => state.movies["rating"];
export const selectLatestMovies = state => state.movies["date_added"];
export const selectLoadedInitialState = state =>
  state.movies.loadedInitialState;

export const {} = moviesSlice.actions;

export default moviesSlice.reducer;
