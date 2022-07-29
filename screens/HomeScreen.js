import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";

// components
import DetailsCard from "../components/DetailsCard";
import DetailsModal from "../components/DetailsModal";
import colors from "../constants/colors";

// actions
import { incrementPage, setPage, addMovies } from "../slices/moviesSlice";

// selectors
import { selectPage, selectMovies } from "../slices/moviesSlice";

// assets
import nacho from "../assets/nacho.png";

const HomeScreen = () => {
  const page = useSelector(selectPage);
  const movies = useSelector(selectMovies);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisibile] = useState(false);
  const [currentDetails, setCurrentDetails] = useState(null);

  const handleDetailsCardPressed = details => {
    setCurrentDetails(details);
    setModalVisibile(true);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.appTitleContainer}>
        <Text style={styles.appTitle}>NachoTime</Text>
        <Image style={styles.appIcon} source={nacho} />
      </View>
      {currentDetails && (
        <DetailsModal
          closeModalCallback={() => setModalVisibile(false)}
          modalVisible={modalVisible}
          details={currentDetails}
        />
      )}
      <FlatList
        data={movies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.detailsCardContainer}>
            <DetailsCard
              onPress={() => handleDetailsCardPressed(item)}
              details={item}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { width: "100%", height: "100%", backgroundColor: "#181826" },
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
  detailsCardContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
