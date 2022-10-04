import { fetchPopularTVShows } from "@app/helpers/tmbd";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  popular: {
    shows: [],
    page: 1,
    loading: false,
    error: "",
    hasMore: true,
  },
  rated: {
    shows: [],
    page: 1,
    loading: false,
    error: "",
    hasMore: true,
  },
  loadedInitialState: false,
};

// TODO: add actions
export const getPopluarTVShows = createAsyncThunk(
  "shows/getPopluarTVShows",
  async (_payload, _thunkApi) => {
    const shows = await fetchPopularTVShows(1);
    return shows;
  },
);

export const getMorePopularTVShows = createAsyncThunk(
  "shows/getMorePopularTVShows",
  async (_payload, { getState }) => {
    const nextPage = getState().shows.popular.page + 1;
    const shows = await fetchPopularTVShows(nextPage);
    return shows;
  },
);

export const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPopluarTVShows.pending, (state, action) => {
        state.popular.loading = true;
        state.popular.error = "";
      })
      .addCase(getPopluarTVShows.fulfilled, (state, action) => {
        state.popular.loading = false;
        state.popular.shows = state.popular.shows.concat(action.payload);
        state.popular.page = 1;
        if (action.payload.length === 0) state.popular.hasMore = false;
        state.loadedInitialState = true;
      })
      .addCase(getPopluarTVShows.rejected, (state, action) => {
        state.popular.loading = false;
        state.popular.error = action.error.message;
      })
      .addCase(getMorePopularTVShows.pending, (state, action) => {
        state.popular.loading = true;
        state.popular.error = "";
      })
      .addCase(getMorePopularTVShows.fulfilled, (state, action) => {
        state.popular.loading = false;
        state.popular.shows = state.popular.shows.concat(action.payload);
        state.popular.page = state.popular.page + 1;
        if (action.payload.length === 0) state.popular.hasMore = false;
        state.loadedInitialState = true;
      })
      .addCase(getMorePopularTVShows.rejected, (state, action) => {
        state.popular.loading = false;
        state.popular.error = action.error.message;
      });
  },
});

export const selectPopularTVShows = state => state.shows.popular;
export const selectTopRatedTVShows = state => state.shows.rated;
export const selectLoadedInitialState = state => state.shows.loadedInitialState;

export const {} = showsSlice.actions;

export default showsSlice.reducer;
