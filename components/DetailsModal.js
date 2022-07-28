import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  ScrollView,
  Button,
  ImageBackground,
  Text,
} from "react-native";

const DetailsModal = ({ currentDetails, modalVisible, closeModalCallback }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={[
          {
            width: "100%",
            height: "100%",
            paddingTop: "30%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
          },
        ]}>
        <View
          style={{
            backgroundColor: "#181826ff",
            width: "100%",
            height: "100%",
          }}>
          <ScrollView>
            <ImageBackground
              source={{
                uri: currentDetails.background_image,
              }}
              style={styles.movieImageBackground}
              resizeMode="stretch">
              <View style={styles.movieDetailsHeader}>
                <Text style={styles.movieTitle}>{currentDetails.title}</Text>
                <View style={styles.movieDataWrapper}>
                  <Text style={styles.movieDataText}>
                    {currentDetails.year}
                  </Text>
                  <Text style={styles.movieDataText}>
                    {currentDetails.runtime}
                  </Text>
                  <Text style={styles.movieDataText}>
                    {currentDetails.genres.join(",")}
                  </Text>
                </View>
              </View>
            </ImageBackground>
            <Button onPress={closeModalCallback} title="Close Modal" />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  movieImageBackground: {
    height: 300,
    width: "100%",
  },
  movieDetailsHeader: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  movieTitle: {
    color: "white",
    fontSize: 32,
  },
  movieDataWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    width: "100%",
  },
  movieDataText: {
    color: "white",
    fontSize: 16,
  },
});

export default DetailsModal;
