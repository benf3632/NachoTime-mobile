import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

// constants
import colors from "../constants/colors";

const ShowDetailsCard = ({ onPress, details }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
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
    resizeMode: "contain",
  },
});

ShowDetailsCard.propTypes = {
  onPress: PropTypes.func,
  details: PropTypes.object,
};

export default ShowDetailsCard;
