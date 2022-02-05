import React from "react";
import { View, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

const DetailsScreen = () => {
  const route = useRoute();
  const { details } = route.params;

  return (
    <View
      style={[
        { width: "100%", height: "100%" },
        tw`flex justify-center items-center bg-gray-800`,
      ]}>
      <Image
        style={{ width: "100%", height: 120, resizeMode: "cover" }}
        source={{ uri: details.background_image_original }}
      />
      <Text style={tw`text-white`}>{details.title}</Text>
    </View>
  );
};

export default DetailsScreen;
