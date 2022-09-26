import React, { useEffect } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

// constants
import colors from "@app/constants/colors";

// actions
import {
  getPopluarTVShows,
  //   getNextPage,
} from "@app/slices/showsSlice";

// selectors
import {
  selectTopRatedTVShows,
  selectPopularTVShows,
  selectLoadedInitialState,
} from "@app/slices/showsSlice";

// components
import ShowDetailsCard from "./ShowDetailsCard";
import LoadingCard from "./LoadingCard";

// icons
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const TVShowsList = ({ onSelect }) => {
  const dispatch = useDispatch();

  const popluarTVShows = useSelector(selectPopularTVShows);
  const topRatedTVShows = useSelector(selectTopRatedTVShows);
  //   //   const latestMovies = useSelector(selectLatestMovies);
  const loadedInitialState = useSelector(selectLoadedInitialState);

  const fetchNextPage = async filter => {
    await dispatch(getNextPage(filter));
  };

  useEffect(() => {
    if (!loadedInitialState) {
      dispatch(getPopluarTVShows());
    }
  }, []);

  return (
    <>
      <View style={styles.headingContainer}>
        <View style={styles.headingMarker} />
        <Text style={styles.heading}>Popular TV Shows</Text>
      </View>
      {popluarTVShows.error ? (
        <View style={styles.errorContainer}>
          <TouchableOpacity onPress={getPopularMovies}>
            <FontAwesome5 name="redo" color="#757575" size={15} />
          </TouchableOpacity>
          <Text style={{ color: "#757575" }}>{popluarTVShows.error}</Text>
        </View>
      ) : (
        <FlatList
          style={styles.horizontalMovieListContainer}
          horizontal
          data={popluarTVShows.shows}
          keyExtractor={(item, index) =>
            `popularShows_${item.imdb_code}_${index}`
          }
          ListFooterComponent={popluarTVShows.loading ? <LoadingCard /> : <></>}
          onEndReachedThreshold={0.5}
          //   onEndReached={() => fetchNextPage("download_count")}
          renderItem={({ item }) => (
            <ShowDetailsCard
              style={{ marginRight: 10 }}
              onPress={() => onSelect(item, "tv")}
              details={item}
            />
          )}
        />
      )}
      {/* <View style={styles.headingContainer}>
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
              onPress={() => onSelect(item)}
              details={item}
            />
          )}
        />
      )} */}
      {/* <View style={styles.headingContainer}>
        <View style={styles.headingMarker} />
        <Text style={styles.heading}>Most Rated</Text>
      </View>
      {topRatedTVShows.error ? (
        <View style={styles.errorContainer}>
          <TouchableOpacity onPress={getRatedMovies}>
            <FontAwesome5 name="redo" color="#757575" size={15} />
          </TouchableOpacity>
          <Text style={{ color: "#757575" }}>{topRatedTVShows.error}</Text>
        </View>
      ) : (
        <FlatList
          style={styles.horizontalMovieListContainer}
          horizontal
          data={topRatedTVShows.movies}
          ListFooterComponent={
            topRatedTVShows.loading ? <LoadingCard /> : <></>
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchNextPage("rating")}
          keyExtractor={(item, index) =>
            `ratedMovies_${item.imdb_code}_${index}`
          }
          renderItem={({ item }) => (
            <ShowDetailsCard
              style={{ marginRight: 10 }}
              onPress={() => onSelect(item)}
              details={item}
            />
          )}
        />
      )} */}
    </>
  );
};

export default TVShowsList;

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
