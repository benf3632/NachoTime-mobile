import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

// constants
import colors from "../constants/colors";

const LoadingCard = () => {
  return (
    <View style={styles.loadingCardContainer}>
      <ActivityIndicator size="large" color={colors.background_accent} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingCardContainer: {
    width: 110,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default LoadingCard;
