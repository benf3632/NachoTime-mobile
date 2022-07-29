import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../constants/colors";

const DetailsCard = ({ onPress, details }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Image
        style={[{ width: 150, height: 150, resizeMode: "contain" }]}
        source={{ uri: details.large_cover_image }}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.showTitle}>{details.title_long}</Text>
        <View style={styles.summaryContainer}>
          <Text style={styles.text}>{details.genres.join(" - ")}</Text>
        </View>
        <Text numberOfLines={4} ellipsizeMode="tail" style={styles.text}>
          {details.summary}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  detailsContainer: {
    flexShrink: 10,
  },
  showTitle: {
    fontWeight: "700",
    color: colors.primary,
  },
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    color: colors.primary,
  },
});

DetailsCard.propTypes = {
  onPress: PropTypes.func,
  details: PropTypes.object,
};

export default DetailsCard;
