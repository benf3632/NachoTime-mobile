import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
} from "react-native";
import Video from "react-native-video";
import { useNavigation } from "@react-navigation/native";
import Orientation from "react-native-orientation";
import Slider from "@react-native-community/slider";
import { addListener } from "react-native-torrent-stream";
import { useDispatch, useSelector } from "react-redux";

// icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

// constants
import colors from "@app/constants/colors";

// selectors
import {
  selectCurrentDownload,
  selectDownload,
  setBuffered,
} from "@app/slices/downloadsSlice";

const formatSecondsToHHMMSS = seconds => {
  return new Date(seconds * 1000).toISOString().substring(11, 19);
};

const VideoScreen = ({ route }) => {
  const navigation = useNavigation();
  const { downloadKey } = route.params;
  const dispatch = useDispatch();

  const currentDownload = useSelector(selectDownload(downloadKey));
  const [videoSource, setVideoSource] = useState("background");

  const player = useRef(null);

  const [playerPaused, setPlayerPaused] = useState(false);
  const [buffering, setBuffering] = useState(
    !currentDownload.torrentDetails.buffered,
  );
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const controlsTimeout = useRef(null);

  const controlsViewAnimation = useRef(new Animated.Value(0)).current;

  const handleVideoPlayerPressed = () => {
    if (showControls) {
      startControlsHidingAnimation();
      clearControlsTimeout();
    } else {
      startControlsDisplayAnimation();
      resetControlsTimeout();
    }
  };

  const togglePlayPause = () => {
    setPlayerPaused(!playerPaused);
    resetControlsTimeout();
  };

  const fastForward = () => {
    resetControlsTimeout();
    player.current.seek(Math.floor(currentTime) + 15);
  };

  const rewind = () => {
    resetControlsTimeout();
    player.current.seek(Math.floor(currentTime) - 15);
  };

  const onVideoLoad = params => {
    console.log(params);
    setDuration(params.duration);
    setPlayerPaused(true);
  };

  const onVideoProgress = params => {
    if (isSliding) return;
    setCurrentTime(params.currentTime);
  };

  const handleSliderValueChange = value => {
    setCurrentTime(value * duration);
  };

  const handleSlidingStarted = value => {
    clearControlsTimeout();
    setIsSliding(true);
    setPlayerPaused(true);
  };

  const handleSlidingComplete = value => {
    player.current.seek(value * duration);
    resetControlsTimeout();
    setCurrentTime(value * duration);
    setPlayerPaused(false);
    setIsSliding(false);
  };

  const clearControlsTimeout = () => {
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
      controlsTimeout.current = null;
    }
  };

  const resetControlsTimeout = () => {
    clearControlsTimeout();
    controlsTimeout.current = setTimeout(() => {
      startControlsHidingAnimation();
    }, 3000);
  };

  const startControlsDisplayAnimation = () => {
    setShowControls(true);
    Animated.timing(controlsViewAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const startControlsHidingAnimation = () => {
    Animated.timing(controlsViewAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowControls(false);
    });
  };

  const onSeek = seek => {
    setCurrentTime(seek.currentTime);
  };

  useEffect(() => {
    const unsubscribeBeforeRemove = navigation.addListener(
      "beforeRemove",
      () => {
        player.current.dismissFullscreenPlayer();
        Orientation.lockToPortrait();
      },
    );
    const torrentStatusListener = addListener("progress", progress => {
      // console.log(status);
      if (progress.data === "onStreamReady") {
        setBuffering(false);
        dispatch(setBuffered({ key: currentDownload.key, buffered: true }));
        setPlayerPaused(true);
        setPlayerPaused(false);
      }
    });
    Orientation.lockToLandscape();
    player.current.presentFullscreenPlayer();
    startControlsDisplayAnimation();
    return () => {
      unsubscribeBeforeRemove();
      torrentStatusListener.remove();
    };
  }, []);

  useEffect(() => {
    setVideoSource(currentDownload?.torrentDetails.path || "background");
  }, [currentDownload.torrentDetails.path]);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <TouchableWithoutFeedback
        touchSoundDisabled
        style={{ width: "100%", height: "100%" }}
        onPress={handleVideoPlayerPressed}>
        <Video
          ref={player}
          onLoad={onVideoLoad}
          onSeek={onSeek}
          onProgress={onVideoProgress}
          volume={1.0}
          paused={playerPaused}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          source={{ uri: videoSource }}
        />
      </TouchableWithoutFeedback>
      {/* Controls */}
      {showControls && (
        <TouchableWithoutFeedback
          touchSoundDisabled
          onPress={handleVideoPlayerPressed}>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#00000050",
              paddingTop: 10,
              justifyContent: "space-between",
              opacity: controlsViewAnimation,
            }}>
            <Text style={{ textAlign: "center", color: "white" }}>
              {currentDownload?.showDetails.title}
            </Text>
            {/* Play Pause controls */}
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <TouchableOpacity
                onPress={rewind}
                style={{ paddingRight: "10%" }}>
                <MaterialCommunityIcons
                  name="rewind-15"
                  size={50}
                  color="white"
                />
              </TouchableOpacity>
              {videoSource === "background" ||
              videoSource === "" ||
              buffering ? (
                <ActivityIndicator size="large" color={colors.primary} />
              ) : (
                <TouchableOpacity onPress={togglePlayPause}>
                  <Ionicons
                    name={playerPaused ? "play" : "pause"}
                    size={60}
                    color="white"
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={fastForward}
                style={{ paddingLeft: "9%" }}>
                <MaterialCommunityIcons
                  name="fast-forward-15"
                  size={50}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                height: "10%",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                paddingHorizontal: "2%",
              }}>
              <Text style={{ color: colors.primary }}>
                {formatSecondsToHHMMSS(currentTime)}
              </Text>
              <Slider
                onValueChange={handleSliderValueChange}
                onSlidingComplete={handleSlidingComplete}
                onSlidingStart={handleSlidingStarted}
                value={duration !== 0 ? currentTime / duration : 0}
                style={{ flex: 2 }}
                minimumTrackTintColor={colors.accent}
                thumbTintColor={colors.accent}
              />
              <Text style={{ color: colors.primary }}>
                {formatSecondsToHHMMSS(duration)}
              </Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default VideoScreen;
