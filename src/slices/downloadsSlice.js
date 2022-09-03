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
    startDownloadNextInQueue(state, action) {
      // TODO: Add checking if user enabled downloading using mobile data
      if (
        state.current_download &&
        state.all_downloads[state.current_download].downloadType === "download"
      ) {
        if (state.queue.includes(state.current_download)) {
          state.queue.splice(state.queue.indexOf(state.current_download), 1);
        }
      }
      stopTorrent();
      state.current_download = "";
      if (state.queue.length === 0) return;
      const nextInQueue = state.queue[0];
      startTorrent(state.all_downloads[nextInQueue].torrentDetails.magnet);
      state.current_download = nextInQueue;
    },
    startDownload(state, action) {
      const key = action.payload.key;
      if (state.all_downloads[key]) {
        if (state.current_download) {
          stopTorrent();
        }
        startTorrent(state.all_downloads[key].torrentDetails.magnet);
        state.current_download = key;
        state.all_downloads[key].torrentDetails.downloadSpeed = "0";
        state.all_downloads[key].torrentDetails.seeds = "0";
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
        if (key === state.current_download) {
          stopTorrent();
          state.current_download = "";
        }
        if (state.queue.includes(key)) {
          state.queue.splice(state.queue.indexOf(key), 1);
        }
        // TODO: delete files
        delete state.all_downloads[key];
      }
    },
  },
});

export const {
  addDownload,
  addCacheDownload,
  deleteDownload,
  startDownloadNextInQueue,
  startDownload,
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
