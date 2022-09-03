import { createSlice } from "@reduxjs/toolkit";

import { startTorrent, stopTorrent } from "react-native-torrent-stream";

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

        if (state.queue.length === 1 && !state.current_download) {
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
      stopTorrent();
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
    setProgress(state, action) {
      const key = action.payload.key;
      state.all_downloads[key].torrentDetails.progress =
        action.payload.progress;
      state.all_downloads[key].torrentDetails.seeds = action.payload.seeds;
      state.all_downloads[key].torrentDetails.downloadSpeed =
        action.payload.downloadSpeed;
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
        stopTorrent();
        state.current_download = "";
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
  deleteDownload,
  stopDownload,
  setPath,
  setBuffered,
  setProgress,
} = downloadsSlice.actions;

export const selectCurrentDownload = state => {
  if (!state.downloads.current_download) return null;
  return state.downloads.all_downloads[state.downloads.current_download];
};

export const selectDownloads = state => {
  const downloadsArray = Object.values(state.downloads.all_downloads);
  return downloadsArray.filter(value => value.downloadType === "download");
};

export const selectCachedDownloads = state => {
  const downloadsArray = Object.values(state.downloads.all_downloads);
  return downloadsArray.filter(value => value.downloadType === "cache");
};

export const selectDownload = key => {
  return state => state.downloads.all_downloads[key];
};

export default downloadsSlice.reducer;
