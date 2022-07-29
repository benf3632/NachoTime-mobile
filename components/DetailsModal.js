import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  ScrollView,
  Button,
  ImageBackground,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ReadMore from "@fawazahmed/react-native-read-more";

// helpers
import { fetchShowBackdropURL, fetchCast } from "../helper/tmbd";

// icons
import Ionicons from "react-native-vector-icons/Ionicons";

// constants
import colors from "../constants/colors";

const DetailsModal = ({ details, modalVisible, closeModalCallback }) => {
  const [showBackdropURL, setShowBackdropURL] = useState(null);
  const [showCast, setShowCast] = useState(null);

  const getShowBackdropURL = async () => {
    const backdropURL = await fetchShowBackdropURL(details.imdb_code);
    setShowBackdropURL(backdropURL);
  };

  const getCast = async () => {
    const cast = await fetchCast(details.imdb_code);
    setShowCast(cast);
  };

  useEffect(() => {
    getShowBackdropURL();
    getCast();
  }, [details]);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <ScrollView style={styles.showModalScrollView}>
          {/* Modal Header */}
          <ImageBackground
            source={{
              uri: showBackdropURL,
            }}
            style={styles.showImageBackground}
            resizeMode="cover">
            <TouchableOpacity onPress={closeModalCallback}>
              <Ionicons name="arrow-down" size={30} color="black" />
            </TouchableOpacity>
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
                <Text style={styles.showDataText}>{details.runtime} min</Text>
                <View style={styles.verticalSeperator} />
                <Text style={styles.showDataText}>
                  {details.genres.join(", ")}
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
          {/* Modal Body */}
          <View style={styles.modalBody}>
            {/* Show Actions */}
            <View>
              {/* Quality Chooser */}
              {/* Watch Button */}
              {/* Download Button */}
            </View>
            {/* Show Summary */}
            <Text style={styles.headingText}>Story Line</Text>
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.background,
  },
  showModalScrollView: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  showImageBackground: {
    height: 400,
    width: "100%",
    justifyContent: "space-between",
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
