import { View, Text, StyleSheet, Animated } from "react-native";
import React from "react";
import colors from "@app/constants/colors";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import CircularProgress from "react-native-circular-progress-indicator";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";

// icons
import Ionicons from "react-native-vector-icons/Ionicons";

// selectors
import {
  selectCurrentDownload,
  selectDownload,
} from "@app/slices/downloadsSlice";

// utils
import { formatDownloadSpeed } from "@app/utils/torrent";

const AnimatedView = Animated.createAnimatedComponent(View);

const DownloadCard = ({ detailsKey }) => {
  const currentDownload = useSelector(selectCurrentDownload);
  const download = useSelector(selectDownload(detailsKey));

  const isCurrentDownload = detailsKey === currentDownload.key;

  const playShow = () => {
    console.log("Play Show");
  };

  const deleteShow = direction => {
    console.log("Delete Show");
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

  return (
    <TouchableOpacity onPress={playShow}>
      <Swipeable
        overshootLeft={false}
        friction={2}
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
              <Text style={styles.title}>
                {download.showDetails.title} ({download.showDetails.year})
              </Text>
            </View>
            <Text style={styles.secondaryText}>
              {download.torrentDetails.quality}
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
            <TouchableOpacity>
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
  },
  titleContainer: {
    flexDirection: "row",
    flex: 2,
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
