import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

const ShowDetailsCard = ({ onPress, details, style }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <FastImage
        style={styles.imageCover}
        source={{ uri: details.large_cover_image }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageCover: {
    width: 110,
    height: 150,
    backgroundColor: "black",
  },
});

ShowDetailsCard.propTypes = {
  onPress: PropTypes.func,
  details: PropTypes.object,
};

export default ShowDetailsCard;
