import { View, Text, StyleSheet, Animated, Alert } from "react-native";
import React, { useRef } from "react";
import colors from "@app/constants/colors";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "react-native-circular-progress-indicator";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

// icons
import Ionicons from "react-native-vector-icons/Ionicons";

// selectors
import {
  selectCurrentDownload,
  selectDownload,
  startDownload,
  stopDownload,
} from "@app/slices/downloadsSlice";

// actions
import { deleteDownload } from "@app/slices/downloadsSlice";

// utils
import { formatDownloadSpeed } from "@app/utils/torrent";

const AnimatedView = Animated.createAnimatedComponent(View);

const DownloadCard = ({ detailsKey }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentDownload = useSelector(selectCurrentDownload);
  const download = useSelector(selectDownload(detailsKey));

  const downloadCardSwipableRef = useRef();

  const isCurrentDownload = detailsKey === currentDownload?.key;

  const playShow = () => {
    if (!isCurrentDownload) {
      dispatch(startDownload({ key: download.key }));
    }
    navigation.navigate("Video", { downloadKey: download.key });
  };

  const toggleStartPauseDownload = () => {
    const dispatchFunc = isCurrentDownload ? stopDownload : startDownload;
    dispatch(dispatchFunc({ key: detailsKey }));
  };

  const deleteShow = direction => {
    console.log("Delete Show");
    if (direction === "left") {
      downloadCardSwipableRef.current.close();
      Alert.alert(
        "Warning",
        "Are you sure you want to delete the show?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => dispatch(deleteDownload({ key: detailsKey })),
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  };

  const renderLeftAction = (_progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 30],
      outputRange: [-20, 5],
    });
    return (
      <View style={styles.deleteContainer}>
        <AnimatedView style={{ transform: [{ translateX: trans }] }}>
          <Ionicons name="trash-outline" size={30} color={colors.primary} />
        </AnimatedView>
      </View>
    );
  };

  const setSwipableRef = ref => {
    downloadCardSwipableRef.current = ref;
  };

  return (
    <TouchableOpacity onPress={playShow}>
      <Swipeable
        ref={setSwipableRef}
        overshootLeft={false}
        friction={1}
        leftThreshold={60}
        onSwipeableOpen={deleteShow}
        renderLeftActions={renderLeftAction}>
        <View style={styles.cardContainer}>
          <FastImage
            style={styles.coverImage}
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: download.showDetails.cover_image }}
          />
          <View style={styles.showDetailsContainer}>
            <View style={styles.titleContainer}>
              <Text numberOfLines={3} style={styles.title}>
                {download.showDetails.title} ({download.showDetails.year})
              </Text>
            </View>
            <Text style={styles.secondaryText}>
              {download.torrentDetails.quality} {download.torrentDetails.size}
            </Text>
            {isCurrentDownload && (
              <View>
                <Text style={styles.secondaryText}>
                  SE: {download.torrentDetails.seeds} DS:{" "}
                  {formatDownloadSpeed(download.torrentDetails.downloadSpeed)}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.actionsContainer}>
            {download.torrentDetails.progress !== "100.0" ? (
              <TouchableOpacity onPress={toggleStartPauseDownload}>
                <CircularProgress
                  value={parseInt(download.torrentDetails.progress)}
                  radius={20}
                  maxValue={100}
                  showProgressValue={false}
                  activeStrokeWidth={3}
                  activeStrokeColor={colors.accent}
                  title={
                    <Ionicons
                      name={isCurrentDownload ? "pause" : "play"}
                      size={15}
                    />
                  }
                />
              </TouchableOpacity>
            ) : (
              <Ionicons
                name="checkmark-circle"
                color={colors.accent}
                size={35}
              />
            )}
          </View>
        </View>
      </Swipeable>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteContainer: {
    width: "50%",
    backgroundColor: "#FA050D",
    flexDirection: "row",
    overflow: "hidden",
    height: "92.5%",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
  },
  cardContainer: {
    backgroundColor: colors.background_accent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2%",
    borderRadius: 10,
  },
  coverImage: {
    flex: 1,
    width: 100,
    height: 100,
    overflow: "hidden",
  },
  showDetailsContainer: {
    flex: 2,
    marginLeft: "1%",
    justifyContent: "space-around",
  },
  titleContainer: {
    flexDirection: "row",
  },
  title: {
    color: colors.primary,
    flexWrap: "wrap",
  },
  secondaryText: {
    color: colors.secondary,
  },
  actionsContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default DownloadCard;
