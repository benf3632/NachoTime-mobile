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
import Video, { TextTrackType } from "react-native-video";
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
    console.log(params);
    if (isSliding) return;
    setCurrentTime(params.currentTime);
  };

  const handleSliderValueChange = value => {
    if (!isSliding) return;
    player.current.seek(value * duration);
  };

  const handleSlidingStarted = _value => {
    clearControlsTimeout();
    setIsSliding(true);
    setPlayerPaused(true);
  };

  const handleSlidingComplete = value => {
    player.current.seek(value * duration);
    resetControlsTimeout();
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
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const startControlsHidingAnimation = () => {
    Animated.timing(controlsViewAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowControls(false);
    });
  };

  const onSeek = seek => {
    console.log(seek);
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
          // textTracks={[
          //   {
          //     title: "English Subtitles",
          //     language: "en",
          //     type: TextTrackType.VTT,
          //     uri: "https://www.opensubtitles.com/download/47B0C70E0D79B0A05F1245DCA75217ABC613C89EF9829343058C28D63ADB1E4F828FED6AEC75B7EE767D4EC45DC77AC150573CDE5972F089E6EC5B0E51EF5F0AD10C43BE312303AA56161498115FB7DA24C6F92F3597DE23959A7D79C6B236BD79C6148A520C6549D13EFB02C63D900CBC316693C00200EBC9B496A31A96349371871CACFBD38126189DF27AFD74C482C087D2E9B1B52167AAEA47BFA3BED4AD390531452709A1609C6C9C78E5482673C90713D408E37F56E2426D939FFE4C01D926054E98578714682B4B53F4CE3459805E434D5072DD6AC09206E9E8C057A36A2969DCB62484B3FF16F8A4D6A7D5BA86EDA5A34F22E0C0EC6FA31160A19E8F69FD6EC8795AFD54D20C2FB1CBC6FBD3ABD75ED473DB59AC8D4ADAF4DB88D8AC2B894E1A64DC4CC92F9DF50A4B7495AC8E5C49F10A2893E83A53E1F63B5A9D31E996270251E2108D58035D705E6C9C37B7D4323802F80F72/subfile/Doctor.Strange.in.the.Multiverse.of.Madness.2022.1080p.WEB-DL.DDP5.1.Atmos.H.264-EVO-HI.vtt",
          //   },
          // ]}
          // selectedTextTrack={{
          //   type: "language",
          //   value: "en",
          // }}
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
