import colors from "@app/constants/colors";
import { set } from "immer/dist/internal";
import React, { useEffect } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

const TabBar = ({ state, descriptors, navigation }) => {
  const [width, setWidth] = React.useState(0);
  const [iconWidth, setIconWidth] = React.useState(0);

  const indicatorPosition = React.useRef(new Animated.Value(0)).current;

  const animateIndicator = index => {
    Animated.spring(indicatorPosition, {
      toValue: width * index,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={{
        paddingHorizontal: "2%",
        paddingVertical: "3%",
        flexDirection: "row",
        backgroundColor: "black",
        elevation: 2,
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let iconName;
        switch (route.name) {
          case "Home":
            iconName = "home";
            break;
          case "Search":
            iconName = "search";
            break;
          case "Favorites":
            iconName = "heart";
            break;
          case "Downloads":
            iconName = "md-download";
            break;
          case "Settings":
            iconName = "settings";
            break;
          default:
            iconName = "";
            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
            animateIndicator(index);
          }
        };
        return (
          <TouchableOpacity
            onLayout={event => {
              setWidth(event.nativeEvent.layout.width);
            }}
            style={{ flex: 1, alignItems: "center" }}
            onPress={onPress}
            key={route.key}
            testID={options.tabBarTestID}>
            <Ionicons
              onLayout={event => {
                setIconWidth(event.nativeEvent.layout.width);
              }}
              name={iconName}
              size={30}
              color={isFocused ? "white" : "gray"}
            />
          </TouchableOpacity>
        );
      })}
      <Animated.View
        style={{
          position: "absolute",
          backgroundColor: "white",
          top: 0,
          width: iconWidth * 1.5,
          height: "20%",
          borderRadius: width,
          overflow: "hidden",
          left: width / 2 - iconWidth / 2,
          transform: [
            {
              translateX: indicatorPosition,
            },
          ],
        }}
      />
    </View>
  );
};

export default TabBar;
