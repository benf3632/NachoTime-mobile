import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import SkeletonContent from "react-native-skeleton-content-nonexpo";

// constants
import colors from "@app/constants/colors";

const ShowDetailsCard = ({ onPress, details, style }) => {
  const [loadingImage, setLoadingImage] = useState(true);
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <SkeletonContent
        boneColor="black"
        duration={2000}
        containerStyle={{
          flex: 1,
          height: 150,
          width: 110,
          position: "absolute",
          marginRight: 10,
        }}
        isLoading={loadingImage}
        layout={[
          { key: "imageCover", width: 110, height: 150 },
        ]}></SkeletonContent>
      <Image
        onLoadEnd={() => {
          setLoadingImage(false);
        }}
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

export default memo(ShowDetailsCard);
