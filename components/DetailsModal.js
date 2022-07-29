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
} from "react-native";

// helpers
import { fetchShowBackdropURL } from "../helper/tmbd";

// icons
import Ionicons from "react-native-vector-icons/Ionicons";

const DetailsModal = ({ details, modalVisible, closeModalCallback }) => {
  const [showBackdropURL, setShowBackdropURL] = useState(null);

  const getShowBackdrop = async () => {
    const backdropURL = await fetchShowBackdropURL(details.imdb_code);
    setShowBackdropURL(backdropURL);
  };

  useEffect(() => {
    getShowBackdrop();
  }, [details]);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={[
          {
            width: "100%",
            height: "100%",
          },
        ]}>
        <View
          style={{
            backgroundColor: "#181826ff",
            width: "100%",
            height: "100%",
          }}>
          <ScrollView style={styles.showModalScrollView}>
            <ImageBackground
              source={{
                uri: showBackdropURL,
              }}
              style={styles.showImageBackground}
              resizeMode="stretch">
              <TouchableOpacity onPress={closeModalCallback}>
                <Ionicons name="arrow-down" size={30} color="black" />
              </TouchableOpacity>
            </ImageBackground>
            <View style={styles.showDetailsHeader}>
              <Text style={styles.showTitle}>{details.title}</Text>
              <View style={styles.showDataWrapper}>
                <Text style={styles.showDataText}>{details.year}</Text>
                <View style={styles.verticalSeperator} />
                <Text style={styles.showDataText}>{details.runtime} min</Text>
                <View style={styles.verticalSeperator} />
                <Text style={styles.showDataText}>
                  {details.genres.join(", ")}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  showModalScrollView: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  showImageBackground: {
    height: 300,
    width: "100%",
    paddingLeft: 10,
    paddingTop: 10,
  },
  showDetailsHeader: {
    width: "100%",
    // height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  showTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 32,
  },
  showDataWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    width: "100%",
  },
  showDataText: {
    color: "white",
    fontWeight: "300",
    fontSize: 16,
  },
  verticalSeperator: {
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default DetailsModal;
