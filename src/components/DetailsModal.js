import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ReadMore from "@fawazahmed/react-native-read-more";
import { addListener } from "react-native-torrent-stream";
import { useDispatch } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";

// helpers
import {
  fetchShowBackdropURL,
  fetchCast,
  fetchTvCast,
} from "@app/helpers/tmbd";

// icons
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

// constants
import colors from "@app/constants/colors";

// actions
import { addDownload, addCacheDownload } from "@app/slices/downloadsSlice";

// utils
import { selectBestTorrent, generateYTSMagnetURL } from "@app/utils/torrent";

const DetailsModal = ({ route, modalVisible, closeModalCallback }) => {
  const { details, showType } = route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showBackdropURL, setShowBackdropURL] = useState(null);
  const [showCast, setShowCast] = useState(null);
  const [availableQualities, setAvailableQualities] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState(null);

  const getShowBackdropURL = async () => {
    const backdropURL =
      details.backdrop_path || (await fetchShowBackdropURL(details.imdb_code));
    setShowBackdropURL(backdropURL);
  };

  const getCast = async () => {
    const cast =
      showType === "movie"
        ? await fetchCast(details.imdb_code)
        : await fetchTvCast(details.tmdbid);
    setShowCast(cast);
  };

  const getShowAvailableQualities = () => {
    const showQualities = new Set();
    details.torrents.forEach(torrent => {
      showQualities.add(torrent.quality);
    });
    setAvailableQualities(Array.from(showQualities));
  };

  const addMovieToDownload = downloadType => {
    // TODO: check if the user selected a quality
    const torrentInfo = selectBestTorrent(details.torrents, selectedQuality);
    const movieDetails = {
      imdb_code: details.imdb_code,
      title: details.title,
      year: details.year,
      cover_image: details.large_cover_image,
    };
    const magnet = generateYTSMagnetURL(torrentInfo.hash);
    const torrentDetails = {
      hash: torrentInfo.hash,
      seeds: "0",
      size: torrentInfo.size,
      magnet: magnet,
      progress: 0,
      path: "",
      quality: selectedQuality,
      buffered: false,
      downloadSpeed: "0",
    };
    const addDownloadFunc =
      downloadType === "cache" ? addCacheDownload : addDownload;
    dispatch(
      addDownloadFunc({
        key: torrentInfo.hash,
        showType: "movie",
        torrentDetails: torrentDetails,
        showDetails: movieDetails,
      }),
    );
    if (downloadType === "cache") {
      navigation.navigate("Video", { downloadKey: torrentInfo.hash });
    }
  };

  useEffect(() => {
    getShowBackdropURL();
    getCast();
    if (showType === "movie") {
      getShowAvailableQualities();
    }
    setSelectedQuality(null);
  }, [details]);

  return (
    <View style={styles.modalContainer}>
      <ScrollView style={styles.showModalScrollView}>
        {/* Modal Header */}
        <ImageBackground
          source={{
            uri: showBackdropURL,
          }}
          style={styles.showImageBackground}
          resizeMode="cover">
          {/* Favorite Icon */}
          <LinearGradient
            colors={["#00000000", colors.background]}
            style={styles.showDetailsHeader}>
            <Text style={styles.showTitle}>{details.title}</Text>
            <View style={styles.showRatingContainer}>
              <Ionicons name="star" color="yellow" size={18} />
              <Text style={styles.showRatingText}>{details.rating}</Text>
            </View>
            <View style={styles.showDataContainer}>
              <Text style={styles.showDataText}>{details.year}</Text>
              <View style={styles.verticalSeperator} />
              {showType === "movie" && (
                <>
                  <Text style={styles.showDataText}>{details.runtime} min</Text>
                  <View style={styles.verticalSeperator} />
                </>
              )}
              <Text style={styles.showDataText}>
                {details.genres?.join(", ")}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
        {/* Modal Body */}
        <View style={styles.modalBody}>
          <View style={styles.summaryHeadingContainer}>
            {/* Show Summary */}
            <Text style={styles.headingText}>Story Line</Text>
            {/* Show Actions */}
            <View style={styles.actionsContainer}>
              {/* Quality Chooser */}
              <View style={styles.qualityDropdownContainer}>
                <SelectDropdown
                  buttonStyle={styles.qualityDropdown}
                  buttonTextStyle={styles.qualityOptionText}
                  rowStyle={styles.qualityDropdownRow}
                  rowTextStyle={styles.qualityDropdownRowText}
                  defaultButtonText="Quality"
                  renderDropdownIcon={() => (
                    <FontAwesome name="chevron-down" size={12} color="white" />
                  )}
                  data={availableQualities}
                  onSelect={selectedItem => {
                    setSelectedQuality(selectedItem);
                  }}
                />
              </View>
              {showType === "movie" && (
                <>
                  {/* Watch Button */}
                  <TouchableOpacity
                    onPress={() => addMovieToDownload("cache")}
                    style={styles.moviePlayIcon}>
                    <MaterialCommunityIcons
                      name="movie-play"
                      size={25}
                      color={colors.accent}
                    />
                  </TouchableOpacity>
                  {/* Download Button */}
                  <TouchableOpacity
                    onPress={() => addMovieToDownload("download")}>
                    <AntDesign
                      name="download"
                      size={25}
                      color={colors.accent}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          <ReadMore
            numberOfLines={4}
            seeMoreText="Read More"
            seeMoreStyle={styles.readMoreText}
            expandOnly
            style={styles.text}>
            {details.summary}
          </ReadMore>
          {/* Show Cast */}
          <Text style={styles.headingText}>The Cast</Text>
          {/* Cast */}
          <FlatList
            style={styles.castList}
            horizontal
            data={showCast}
            renderItem={({ item }) => (
              <View style={styles.castContainer}>
                <Image
                  resizeMode="cover"
                  style={styles.castImage}
                  source={{ uri: item.image }}
                />
                <Text style={styles.castName}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        {/* <LinearGradient colors={["#00000000", "#ffffff0f"]}> */}
        <FontAwesome name="chevron-down" size={20} color="white" />
        {/* </LinearGradient> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.background,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  showModalScrollView: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  showImageBackground: {
    height: 400,
    width: "100%",
    justifyContent: "flex-end",
  },
  showDetailsHeader: {
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: "2%",
  },
  showTitle: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 32,
    textAlign: "center",
  },
  showDataContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    width: "100%",
    marginTop: "2%",
  },
  showRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  showRatingText: {
    color: colors.primary,
    fontSize: 16,
    marginLeft: "1%",
  },
  showDataText: {
    color: colors.primary,
    fontWeight: "300",
    fontSize: 16,
  },
  verticalSeperator: {
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
  },
  modalBody: {
    paddingLeft: "5%",
  },
  summaryHeadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qualityDropdownContainer: {
    paddingRight: 10,
  },
  qualityDropdown: {
    width: 100,
    height: 20,
    marginVertical: 10,
    backgroundColor: colors.background_accent,
  },
  qualityOptionText: {
    fontSize: 14,
    color: colors.primary,
  },
  qualityDropdownRow: {
    backgroundColor: colors.background_accent,
  },
  qualityDropdownRowText: {
    color: colors.primary,
  },
  moviePlayIcon: {
    paddingRight: 10,
  },
  headingText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    paddingBottom: "3%",
  },
  text: {
    color: colors.primary,
    fontWeight: "400",
    paddingBottom: "3%",
  },
  readMoreText: {
    fontWeight: "400",
    color: colors.accent,
  },
  castList: {
    width: "100%",
  },
  castContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 10,
  },
  castImage: {
    width: 75,
    height: 100,
    borderRadius: 15,
  },
  castName: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "400",
  },
});

export default DetailsModal;
