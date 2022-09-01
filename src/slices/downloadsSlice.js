import { createSlice } from "@reduxjs/toolkit";

import { startTorrent } from "react-native-torrent-stream";

const initialState = {
  queue: [],
  all_downloads: {},
  current_download: "",
};

export const downloadsSlice = createSlice({
  name: "downloads",
  initialState,
  reducers: {
    addDownload(state, action) {
      const key = action.payload.key;
      if (!state.all_downloads[key]) {
        state.all_downloads[key] = {
          key: key,
          showType: action.payload.showType,
          showDetails: action.payload.showDetails,
          torrentDetails: action.payload.torrentDetails,
          downloadType: "download",
        };
        state.queue.push(key);

        if (state.queue.length === 1) {
          startTorrent(state.all_downloads[key].torrentDetails.magnet);
          state.current_download = key;
        }
      } else if (state.all_downloads[key].downloadType === "cache") {
        state.all_downloads[key].downloadType = "download";
        state.queue.push(key);
      }
    },
    addCacheDownload(state, action) {
      const key = action.payload.key;
      if (!state.all_downloads[key]) {
        state.all_downloads[key] = {
          key: key,
          showType: action.payload.showType,
          showDetails: action.payload.showDetails,
          torrentDetails: action.payload.torrentDetails,
          downloadType: "cache",
        };
      }
      startTorrent(state.all_downloads[key].torrentDetails.magnet);
      state.current_download = key;
    },
    setPath(state, action) {
      const key = action.payload.key;
      if (state.all_downloads[key].torrentDetails.path) return;
      state.all_downloads[key].torrentDetails.path = action.payload.path;
    },
    setBuffered(state, action) {
      const key = action.payload.key;
      state.all_downloads[key].torrentDetails.buffered =
        action.payload.buffered;
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
  setPath,
  setBuffered,
} = downloadsSlice.actions;

export const selectCurrentDownload = state => {
  console.log("State: ", state.downloads.current_download);
  if (!state.downloads.current_download) return null;
  return state.downloads.all_downloads[state.downloads.current_download];
};

export default downloadsSlice.reducer;
