import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";
import tw from "tailwind-react-native-classnames";

const DetailsCard = ({ onPress, details }) => {
  return (
    <TouchableOpacity onPress={onPress} style={tw`flex-row justify-start`}>
      <Image
        style={[{ width: 150, height: 150, resizeMode: "contain" }]}
        source={{ uri: details.large_cover_image }}
      />
      <View style={tw`flex-shrink`}>
        <Text style={tw`font-bold text-white`}>{details.title_long}</Text>
        <View style={tw`flex flex-row flex-wrap`}>
          <Text style={tw`text-white`}>{details.genres.join(" - ")}</Text>
          {/* <StarRating */}
          {/*   disabled */}
          {/*   rating={(details.rating / 10) * 5} */}
          {/*   containerStyle={tw`ml-2 w-20`} */}
          {/*   starStyle={tw`text-sm`} */}
          {/*   fullStarColor="yellow" */}
          {/* /> */}
        </View>
        <Text numberOfLines={4} ellipsizeMode="tail" style={tw`text-white`}>
          {details.summary}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

DetailsCard.propTypes = {
  onPress: PropTypes.func,
  details: PropTypes.object,
};

export default DetailsCard;
