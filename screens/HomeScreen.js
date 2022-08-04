import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";

// components
import ShowDetailsCard from "../components/ShowDetailsCard";
import DetailsModal from "../components/DetailsModal";
import SelectSlider from "../components/SelectSlider";

// constants
import colors from "../constants/colors";

// actions
import { incrementPage, setPage, addMovies } from "../slices/moviesSlice";

// selectors
import { selectPage, selectMovies } from "../slices/moviesSlice";

// assets
import nacho from "../assets/nacho.png";
import MoviesList from "../components/MoviesList";

const HomeScreen = () => {
  const dispatch = useDispatch();
  // const page = useSelector(selectPage);
  // const movies = useSelector(selectMovies);

  const [modalVisible, setModalVisibile] = useState(false);
  const [currentDetails, setCurrentDetails] = useState(null);
  const [selected, setSelected] = useState(0);

  const handleDetailsCardPressed = details => {
    setCurrentDetails(details);
    setModalVisibile(true);
  };

  const ShowsList = () => {
    if (selected === 0) {
      return <MoviesList onSelect={handleDetailsCardPressed} />;
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
  };

  return (
    <View style={styles.screen}>
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
      {currentDetails && (
        <DetailsModal
          closeModalCallback={() => setModalVisibile(false)}
          modalVisible={modalVisible}
          details={currentDetails}
        />
      )}
      <View style={styles.showsListContainer}>
        <ShowsList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
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
