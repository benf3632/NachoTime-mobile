import { set } from "immer/dist/internal";
import React, { useEffect } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

const TabBar = ({ state, descriptors, navigation }) => {
  const [width, setWidth] = React.useState(0);

  const selectedIndicatorPosition = React.useRef(
    new Animated.Value(width / 2 - 25),
  ).current;

  const animateIndicator = index => {
    Animated.spring(selectedIndicatorPosition, {
      toValue:
        index !== 0 ? width * index + (width / 2 - 32.5) : width / 2 - 25,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // selectedIndicatorPosition.setValue(width / 2 - 25);
  }, [width]);

  return (
    <View
      onLayout={event => {
        setWidth(event.nativeEvent.layout.width / state.routes.length);
      }}
      style={{
        paddingHorizontal: "2%",
        paddingTop: "3%",
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
          case "Downloads":
            iconName = "md-download";
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
            style={{ flex: 1, alignItems: "center" }}
            onPress={onPress}
            key={route.key}
            testID={options.tabBarTestID}>
            <Ionicons
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
          width: width / 2.15,
          //   marginLeft: width / 3.25,
          //   paddingRight: width * 0.25,
          height: "20%",
          borderRadius: width,
          //   left: width / 2 - 25,
          overflow: "hidden",
          transform: [
            {
              translateX: selectedIndicatorPosition,
            },
          ],
        }}
      />
    </View>
  );
};

export default TabBar;
