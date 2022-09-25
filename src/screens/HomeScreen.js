import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// components
import SelectSlider from "@app/components/SelectSlider";
import MoviesList from "@app/components/MoviesList";

// constants
import colors from "@app/constants/colors";

// assets
import nacho from "@app/assets/nacho.png";
import TVShowsList from "@app/components/TVShowsList";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);

  const handleDetailsCardPressed = details => {
    navigation.navigate("Details", { details });
  };

  const ShowsList = useCallback(() => {
    if (selected === 0) {
      return <MoviesList onSelect={handleDetailsCardPressed} />;
    } else if (selected === 1) {
      return <TVShowsList onSelect={handleDetailsCardPressed} />;
    } else {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}>
          <Text style={{ color: "white" }}>Not Implemented</Text>
        </View>
      );
    }
  }, [selected]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.appTitleContainer}>
        <Text style={styles.appTitle}>NachoTime</Text>
        <Image style={styles.appIcon} source={nacho} />
      </View>
      <View style={styles.showSelectorContainer}>
        <SelectSlider
          data={[
            { key: "movies", value: "Movies" },
            { key: "series", value: "Series" },
            { key: "anime", value: "Anime" },
          ]}
          onValueChange={setSelected}
        />
      </View>
      <ScrollView ind style={styles.showsListContainer}>
        <ShowsList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    backgroundColor: "#181826",
  },
  showSelectorContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  appTitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
  },
  appTitle: {
    fontSize: 32,
    color: colors.primary,
  },
  appIcon: {
    width: 50,
    height: 50,
  },
  showsListContainer: {
    marginTop: 10,
    paddingHorizontal: "10%",
  },
});

export default HomeScreen;
