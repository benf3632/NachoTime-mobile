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
    startDownload(state, action) {
      const key = action.payload.key;
      if (state.all_downloads[key]?.type === "cache") {
        // TODO: start downloading torrent
      } else if (
        state.all_downloads[key]?.type === "download" &&
        action.payload.type === "cache"
      ) {
        // TODO: start downloading torrent
      } else if (!state.all_downloads[key]) {
        state.all_downloads[key] = {
          name: action.payload.name,
          state: action.payload.type,
        };
        state.queue.push(key);
        // TODO: start downloading if it's first in the queue
      }
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
  addNewDownload,
  changeDownloadState,
  deleteDownload,
  stopDownload,
} = downloadsSlice.actions;
export default downloadsSlice.reducer;
