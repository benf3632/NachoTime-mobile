import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import colors from "../constants/colors";

// actions
import { getMoviesByFilter } from "../slices/moviesSlice";

// selectors
import {
  selectPopularMovies,
  selectRatedMovies,
  selectLatestMovies,
  selectLoadedInitialState,
} from "../slices/moviesSlice";

// components
import ShowDetailsCard from "./ShowDetailsCard";

const MoviesList = ({ onSelect }) => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(selectPopularMovies);
  const ratedMovies = useSelector(selectRatedMovies);
  const latestMovies = useSelector(selectLatestMovies);
  const loadedInitialState = useSelector(selectLoadedInitialState);

  const getPopularMovies = async () => {
    await dispatch(getMoviesByFilter("download_count"));
  };

  const getRatedMovies = async () => {
    await dispatch(getMoviesByFilter("rating"));
  };

  const getLatestMovies = async () => {
    await dispatch(getMoviesByFilter("date_added"));
  };

  useEffect(() => {
    if (!loadedInitialState) {
      getPopularMovies();
      getRatedMovies();
      getLatestMovies();
    }
  }, []);

  return (
    <>
      <View style={styles.headingContainer}>
        <View style={styles.headingMarker} />
        <Text style={styles.heading}>Popular Movies</Text>
      </View>
      <FlatList
        style={styles.horizontalMovieListContainer}
        horizontal
        data={popularMovies.movies}
        keyExtractor={item => `popularMovies_${item.imdb_code}`}
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
        style={styles.horizontalMovieListContainer}
        horizontal
        data={latestMovies.movies}
        keyExtractor={item => `latestMovies_${item.imdb_code}`}
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
        style={styles.horizontalMovieListContainer}
        horizontal
        data={ratedMovies.movies}
        keyExtractor={item => `ratedMovies_${item.imdb_code}`}
        renderItem={({ item }) => (
          <View style={styles.detailsCardContainer}>
            <ShowDetailsCard onPress={() => onSelect(item)} details={item} />
          </View>
        )}
      />
    </>
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
  horizontalMovieListContainer: {
    paddingBottom: "5%",
  },
  detailsCardContainer: {
    marginTop: "10%",
  },
});
