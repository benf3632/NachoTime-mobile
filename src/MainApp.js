import React, { useCallback, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addListener, getVideoFile } from "react-native-torrent-stream";

// constants
import colors from "@app/constants/colors";

// navigator
import MainNavigator from "@app/navigators/MainNavigator";

// actions
import { setPath } from "@app/slices/downloadsSlice";

// selectors
import { selectCurrentDownload } from "@app/slices/downloadsSlice";
import { current } from "@reduxjs/toolkit";

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
        console.log("MainApp: ", currentDownload);
        if (!currentDownload) return;
        const path = await getVideoFile();
        dispatch(setPath({ key: currentDownload.key, path: path }));
      }
    },
    [currentDownload],
  );

  useEffect(() => {
    const torrentProgressListener = addListener("progress", progressCallback);
    return () => {
      torrentProgressListener.remove();
    };
  }, [progressCallback]);
  return (
    <NavigationContainer theme={navTheme}>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default MainApp;
