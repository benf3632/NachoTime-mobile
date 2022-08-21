import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_downloads: {},
  queue: [],
  downloaded: [],
  cached: [],
};

export const downloadsSlice = createSlice({
  name: "downloads",
  initialState,
  reducers: {
    addNewDownload(state, action) {
      const key = action.payload.key;
      state.all_downloads[key] = {
        name: action.payload.name,
        state: action.payload.state,
      };
      // TODO: start downloading
    },
    changeDownloadState(state, action) {
      const key = action.payload.key;
      if (state.all_downloads[key]) {
        state.all_downloads[key].state = action.payload.state;
      }
    },
    stopDownload(state, action) {
      const key = action.payload.key;
      if (state.all_downloads[key]) {
        // TODO: stop downloading
      }
    },
    deleteDownload(state, action) {
      const key = action.payload.key;
      if (state.all_downloads[key]) {
        delete state.all_downloads[key];
      }
      // TODO: stop downloading and delete files
    },
  },
});

export const {
  addNewDownload,
  changeDownloadState,
  deleteDownload,
  stopDownload,
} = downloadsSlice.actions;
export default downloadsSlice.reducer;
