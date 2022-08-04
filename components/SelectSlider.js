import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import colors from "../constants/colors";

export default function SelectSlider({ data, onValueChange }) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [selected, setSelected] = useState(0);
  const sliderPosition = useRef(new Animated.Value(0)).current;

  const handleOnLayout = event => {
    setWidth(event.nativeEvent.layout.width);
    setHeight(event.nativeEvent.layout.height);
  };

  const handleOnPress = index => {
    setSelected(index);
    if (onValueChange !== undefined) {
      onValueChange(index);
    }
    Animated.timing(sliderPosition, {
      toValue: (width / data.length) * index,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      onLayout={handleOnLayout}
      style={[
        styles.sliderContainer,
        {
          // paddingHorizontal: width / 10,
        },
      ]}>
      <Animated.View
        style={[
          styles.selected,
          {
            height: height,
            width: width / data.length + 5,
            transform: [
              {
                translateX: sliderPosition,
              },
            ],
          },
        ]}
      />
      {data.map((item, index) => (
        <TouchableOpacity onPress={() => handleOnPress(index)} key={item.key}>
          <Text
            style={[
              styles.labelText,
              {
                width: width / data.length,
              },
            ]}>
            {item.value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    backgroundColor: colors.background_accent,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 300,
    // paddingVertical: 5,
    borderRadius: 100,
    overflow: "hidden",
  },
  labelText: {
    color: colors.primary,
    // textAlign: "center",
    // textAlignVertical: "center",
    paddingVertical: 5,
    textAlign: "center",
  },
  selected: {
    backgroundColor: colors.accent,
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 100,
  },
});
