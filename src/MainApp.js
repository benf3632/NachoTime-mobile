import React, { useCallback, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addListener, getVideoFile } from "react-native-torrent-stream";

// constants
import colors from "@app/constants/colors";

// navigator
import MainNavigator from "@app/navigators/MainNavigator";

// actions
import {
  setPath,
  setProgress,
  startDownload,
  startDownloadNextInQueue,
} from "@app/slices/downloadsSlice";

// selectors
import { selectCurrentDownload } from "@app/slices/downloadsSlice";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

const MainApp = () => {
  const dispatch = useDispatch();
  const currentDownload = useSelector(selectCurrentDownload);

  const progressCallback = useCallback(
    async event => {
      console.log("MainApp: ", event);
      if (event.data === "onStreamStarted") {
        if (!currentDownload) return;
        const path = await getVideoFile();
        dispatch(setPath({ key: currentDownload.key, path: path }));
      }
    },
    [currentDownload],
  );

  const statusCallback = useCallback(
    status => {
      if (!currentDownload) return;
      if (status.progress.startsWith("99.9") || status.progress === "100.0") {
        dispatch(
          setProgress({
            key: currentDownload.key,
            progress: "100.0",
            seeds: "0",
            downloadSpeed: "0",
          }),
        );
        dispatch(startDownloadNextInQueue());
      } else if (currentDownload.torrentDetails.progress !== "100.0") {
        dispatch(
          setProgress({
            key: currentDownload.key,
            progress: status.progress,
            seeds: status.seeds,
            downloadSpeed: status.downloadSpeed,
          }),
        );
      }
    },
    [currentDownload],
  );

  useEffect(() => {
    const torrentProgressListener = addListener("progress", progressCallback);
    const torrentStatusListener = addListener("status", statusCallback);
    return () => {
      torrentProgressListener.remove();
      torrentStatusListener.remove();
    };
  }, [progressCallback, statusCallback]);

  // init download on app start
  useEffect(() => {
    if (currentDownload?.downloadType === "download") {
      dispatch(startDownload({ key: currentDownload.key }));
    }
  }, []);

  return (
    <NavigationContainer theme={navTheme}>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default MainApp;
