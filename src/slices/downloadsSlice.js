import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queue: [],
  downloaded: [],
  cached: [],
  all_downloads: {},
};

export const downloadsSlice = createSlice({
  name: "downloads",
  initialState,
  reducers: {
    // TODO: create another function called add to queue
    addDownload(state, action) {
      const key = action.payload.key;
      if (!state.all_downloads[key]) {
        state.all_downloads[key] = {
          key: key,
          showType: action.payload.showType,
          showDetails: action.payload.showDetails,
          downloadType: "download",
        };
        state.queue.push(key);
        if (state.queue.length === 1) {
          // TODO: start downloading
        }
      }
    },
    addCacheDownload(state, action) {
      const key = action.payload.key;
      if (!state.all_downloads[key]) {
        state.all_downloads[key] = {
          key: key,
          showType: action.payload.showType,
          showDetails: action.payload.showDetails,
          downloadType: "cache",
        };
      }
      // TODO: start downloading the show
    },
    addToQueue(state, action) {
      const key = action.payload.key;
      if (state.all_downloads[key]) {
        if (!state.queue.find(value => value === key)) return;
        state.all_downloads[key].type = "download";
        state.queue.push(key);
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
        // TODO: stop downloading and delete files
        delete state.all_downloads[key];
      }
    },
  },
});

export const {
  addDownload,
  addCacheDownload,
  changeDownloadState,
  deleteDownload,
  stopDownload,
} = downloadsSlice.actions;
export default downloadsSlice.reducer;
