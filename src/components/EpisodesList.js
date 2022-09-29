import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import SectionList from "react-native-tabs-section-list";

// helpers
import { fetchTvShowEpisodes } from "@app/helpers/tmbd";
import colors from "@app/constants/colors";

const EpisodesList = ({ show }) => {
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    const getEpisodes = async () => {
      //   console.log(show.tmdbid);
      const tvEpisodes = await fetchTvShowEpisodes(show.tmdbid, show.seasons);
      //   console.log(tvEpisodes);
      const sections = tvEpisodes.map(season => ({
        title: season.name,
        data: season.episodes,
      }));
      setEpisodes(sections);
    };
    getEpisodes();
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <SectionList
        sections={episodes}
        keyExtractor={item => item.name}
        stickySectionHeadersEnabled
        renderTab={({ title, isActive }) => (
          <View
            style={[
              styles.tabContainer,
              { borderBottomWidth: isActive ? 1 : 0 },
            ]}>
            <Text
              style={[
                styles.tabText,
                { color: isActive ? colors.accent : colors.primary },
              ]}>
              {title}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <View style={styles.sectionHeaderContainer} />
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <View style={styles.itemContainer}>
              <View style={styles.itemRow}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                {/* <Text style={styles.itemPrice}>${item.price}</Text> */}
              </View>
              <Text style={styles.itemDescription}>{item.summary}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default EpisodesList;

const styles = StyleSheet.create({
  tabBar: {
    // backgroundColor: "#fff",
    borderBottomColor: colors.accent,
    borderBottomWidth: 1,
  },
  tabContainer: {
    // borderBottomColor: "#090909",
  },
  tabText: {
    padding: 15,
    color: colors.primary,
    fontSize: 18,
    fontWeight: "500",
  },
  separator: {
    height: 0.5,
    width: "96%",
    alignSelf: "flex-end",
    backgroundColor: "#eaeaea",
  },
  sectionHeaderContainer: {
    height: 10,
    // backgroundColor: "#f6f6f6",
  },
  sectionHeaderText: {
    color: "#010101",
    // backgroundColor: "#fff",
    fontSize: 23,
    fontWeight: "bold",
    paddingTop: 25,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    // backgroundColor: "#fff",
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    color: "#131313",
  },
  itemPrice: {
    fontSize: 18,
    color: "#131313",
  },
  itemDescription: {
    marginTop: 10,
    color: "#b6b6b6",
    fontSize: 16,
  },
  itemRow: {
    flexDirection: "row",
  },
});
