import React, { useEffect } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import colors from "../constants/colors";

// actions
import { getMoviesByFilter, getNextPage } from "../slices/moviesSlice";

// selectors
import {
  selectPopularMovies,
  selectRatedMovies,
  selectLatestMovies,
  selectLoadedInitialState,
} from "../slices/moviesSlice";
import LoadingCard from "./LoadingCard";

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

  const fetchNextPage = async filter => {
    await dispatch(getNextPage(filter));
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
        keyExtractor={(item, index) =>
          `popularMovies_${item.imdb_code}_${index}`
        }
        ListFooterComponent={popularMovies.loading ? <LoadingCard /> : <></>}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchNextPage("download_count")}
        renderItem={({ item }) => (
          <ShowDetailsCard onPress={() => onSelect(item)} details={item} />
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
        ListFooterComponent={latestMovies.loading ? <LoadingCard /> : <></>}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchNextPage("date_added")}
        keyExtractor={(item, index) =>
          `latestMovies_${item.imdb_code}_${index}`
        }
        renderItem={({ item }) => (
          <ShowDetailsCard onPress={() => onSelect(item)} details={item} />
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
        ListFooterComponent={ratedMovies.loading ? <LoadingCard /> : <></>}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchNextPage("rating")}
        keyExtractor={(item, index) => `ratedMovies_${item.imdb_code}_${index}`}
        renderItem={({ item }) => (
          <ShowDetailsCard onPress={() => onSelect(item)} details={item} />
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
    paddingTop: "3%",
    paddingBottom: "5%",
    flexDirection: "row",
  },
  detailsCardContainer: {
    marginTop: "10%",
  },
});
