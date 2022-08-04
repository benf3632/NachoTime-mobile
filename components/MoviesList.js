import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import colors from "../constants/colors";

// selectors
import { selectMovies, selectPopularMovies } from "../slices/moviesSlice";

// actions
import { getMoviesByFilter } from "../slices/moviesSlice";

// components
import ShowDetailsCard from "./ShowDetailsCard";

const MoviesList = ({ onSelect }) => {
  const dispatch = useDispatch();
  // const movies = useSelector(selectPopularMovies);
  const [movies, setMovie] = useState([]);

  useEffect(() => {
    dispatch(getMoviesByFilter({ filter: "rating" }));
    dispatch(getMoviesByFilter({ filter: "download_count" }));
    dispatch(getMoviesByFilter({ filter: "date_added" }));
  }, []);

  return (
    <View>
      <View style={styles.headingContainer}>
        <View style={styles.headingMarker} />
        <Text style={styles.heading}>Popular Movies</Text>
      </View>
      <FlatList
        horizontal
        // data={movies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.detailsCardContainer}>
            <ShowDetailsCard onPress={() => onSelect(item)} details={item} />
          </View>
        )}
      />
      <View style={styles.headingContainer}>
        <View style={styles.headingMarker} />
        <Text style={styles.heading}>Latest Movies</Text>
      </View>
      <FlatList
        horizontal
        // data={movies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.detailsCardContainer}>
            <ShowDetailsCard onPress={() => onSelect(item)} details={item} />
          </View>
        )}
      />
      <View style={styles.headingContainer}>
        <View style={styles.headingMarker} />
        <Text style={styles.heading}>Most Rated</Text>
      </View>
      <FlatList
        horizontal
        // data={movies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.detailsCardContainer}>
            <ShowDetailsCard onPress={() => onSelect(item)} details={item} />
          </View>
        )}
      />
    </View>
  );
};

export default MoviesList;

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: "2%",
  },

  headingMarker: {
    borderColor: colors.accent,
    borderWidth: 1,
  },

  heading: {
    fontSize: 20,
    color: colors.primary,
    marginLeft: "1%",
  },
  detailsCardContainer: {
    // marginVertical: 20,
    marginTop: "10%",
  },
});
