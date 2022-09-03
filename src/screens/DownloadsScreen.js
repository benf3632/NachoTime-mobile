import React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

// selectors
import {
  selectCachedDownloads,
  selectDownloads,
} from "@app/slices/downloadsSlice";
import colors from "@app/constants/colors";
import DownloadCard from "@app/components/DownloadCard";

const DownloadsScreen = () => {
  const downloads = useSelector(selectDownloads);
  const cachedDownloads = useSelector(selectCachedDownloads);

  const sections = [
    { label: "Downloads", data: downloads },
    { label: "Cache", data: cachedDownloads },
  ];
  return (
    <View style={styles.screenContainer}>
      <SectionList
        sections={sections}
        stickySectionHeadersEnabled
        renderSectionFooter={({ section }) => {
          if (section.data.length !== 0) return;
          return <Text style={{ color: "white" }}>No Downloads</Text>;
        }}
        renderSectionHeader={({ section }) => {
          return (
            <View style={styles.headingContainer}>
              <View style={styles.headingMarker} />
              <Text style={styles.heading}>{section.label}</Text>
            </View>
          );
        }}
        renderItem={({ item }) => <DownloadCard detailsKey={item.key} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: "5%",
    paddingTop: "5%",
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: "2%",
    backgroundColor: colors.background,
    paddingVertical: "2%",
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
});

export default DownloadsScreen;
