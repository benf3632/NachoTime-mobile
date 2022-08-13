import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import colors from "../constants/colors";

// services
import { useGetMoviesByFilterQuery } from "../services/ytsApi";

// components
import ShowDetailsCard from "./ShowDetailsCard";

const MoviesList = ({ onSelect }) => {
  const { data: popularMovies } = useGetMoviesByFilterQuery({
    filter: "download_count",
  });
  const { data: latestMovies } = useGetMoviesByFilterQuery({
    filter: "date_added",
  });
  const { data: mostRated } = useGetMoviesByFilterQuery({
    filter: "rating",
  });

  return (
    <>
      <View style={styles.headingContainer}>
        <View style={styles.headingMarker} />
        <Text style={styles.heading}>Popular Movies</Text>
      </View>
      <FlatList
        style={styles.horizontalMovieListContainer}
        horizontal
        data={popularMovies}
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
        style={styles.horizontalMovieListContainer}
        horizontal
        data={latestMovies}
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
        style={styles.horizontalMovieListContainer}
        horizontal
        data={mostRated}
        keyExtractor={item => item.id}
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
