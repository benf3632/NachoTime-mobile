import React, { useEffect } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import colors from "@app/constants/colors";

// actions
import { getMoviesByFilter, getNextPage } from "@app/slices/moviesSlice";

// selectors
import {
  selectPopularMovies,
  selectRatedMovies,
  selectLatestMovies,
  selectLoadedInitialState,
} from "@app/slices/moviesSlice";
import LoadingCard from "./LoadingCard";

// components
import ShowDetailsCard from "./ShowDetailsCard";

// icons
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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
      {popularMovies.error ? (
        <View style={styles.errorContainer}>
          <TouchableOpacity onPress={getPopularMovies}>
            <FontAwesome5 name="redo" color="#757575" size={15} />
          </TouchableOpacity>
          <Text style={{ color: "#757575" }}>{popularMovies.error}</Text>
        </View>
      ) : (
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
            <ShowDetailsCard
              style={{ marginRight: 10 }}
              onPress={() => onSelect(item, "movie")}
              details={item}
            />
          )}
        />
      )}
      <View style={styles.headingContainer}>
        <View style={styles.headingMarker} />
        <Text style={styles.heading}>Latest Movies</Text>
      </View>
      {latestMovies.error ? (
        <View style={styles.errorContainer}>
          <TouchableOpacity onPress={getLatestMovies}>
            <FontAwesome5 name="redo" color="#757575" size={15} />
          </TouchableOpacity>
          <Text style={{ color: "#757575" }}>{latestMovies.error}</Text>
        </View>
      ) : (
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
            <ShowDetailsCard
              style={{ marginRight: 10 }}
              onPress={() => onSelect(item, "movie")}
              details={item}
            />
          )}
        />
      )}
      <View style={styles.headingContainer}>
        <View style={styles.headingMarker} />
        <Text style={styles.heading}>Most Rated</Text>
      </View>
      {ratedMovies.error ? (
        <View style={styles.errorContainer}>
          <TouchableOpacity onPress={getRatedMovies}>
            <FontAwesome5 name="redo" color="#757575" size={15} />
          </TouchableOpacity>
          <Text style={{ color: "#757575" }}>{ratedMovies.error}</Text>
        </View>
      ) : (
        <FlatList
          style={styles.horizontalMovieListContainer}
          horizontal
          data={ratedMovies.movies}
          ListFooterComponent={ratedMovies.loading ? <LoadingCard /> : <></>}
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchNextPage("rating")}
          keyExtractor={(item, index) =>
            `ratedMovies_${item.imdb_code}_${index}`
          }
          renderItem={({ item }) => (
            <ShowDetailsCard
              style={{ marginRight: 10 }}
              onPress={() => onSelect(item, "movie")}
              details={item}
            />
          )}
        />
      )}
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
  errorContainer: {
    height: 150,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
