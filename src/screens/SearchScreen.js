import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";

// icons
import Ionicons from "react-native-vector-icons/Ionicons";
import DetailsModal from "@app/components/ShowDetailsModal";

// components
import SelectSlider from "@app/components/SelectSlider";
import ShowDetailsCard from "@app/components/ShowDetailsCard";
import LoadingCard from "@app/components/LoadingCard";

// constants
import colors from "@app/constants/colors";

// helpers
import { queryMovies } from "@app/helpers/yts";

const SearchScreen = ({ navigation }) => {
  const [searchInput, onSearchInputChange] = useState("");
  const [searchShowType, setSearchShowType] = useState(0);
  const [searchResult, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const search = async () => {
    setIsSearchLoading(true);
    setSearchResults([]);
    let searchResults;
    if (!searchInput) {
      searchResults = [];
    } else if (searchShowType === 0) {
      searchResults = await queryMovies(searchInput, 1, 20);
    } else {
      searchResults = [];
    }
    setSearchResults(searchResults);
    setIsSearchLoading(false);
  };

  const handleDetailsCardPressed = details => {
    navigation.navigate("Details", { details });
  };

  useEffect(() => {
    if (searchInput.length !== 0) {
      search();
    }
  }, [searchShowType]);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search"
          size={25}
          color="#adacac"
          style={styles.searchIcon}
        />
        <TextInput
          value={searchInput}
          onChangeText={onSearchInputChange}
          style={styles.searchBar}
          selectionColor={colors.primary}
          placeholder="Search for a show, movie, etc"
          placeholderTextColor="#adacac"
          onSubmitEditing={search}
        />
      </View>
      <SelectSlider
        style={styles.showTypeSelector}
        data={[
          { key: "movies", value: "Movies" },
          { key: "series", value: "Series" },
          { key: "anime", value: "Anime" },
        ]}
        onValueChange={setSearchShowType}
      />
      <View
        style={[
          styles.searchResultsContainer,
          { justifyContent: isSearchLoading ? "flex-start" : "center" },
        ]}>
        <FlatList
          data={searchResult}
          keyExtractor={item => item.imdb_code}
          ListFooterComponent={isSearchLoading ? <LoadingCard /> : <></>}
          numColumns={3}
          renderItem={({ item }) => (
            <ShowDetailsCard
              style={styles.showCard}
              onPress={() => handleDetailsCardPressed(item)}
              details={item}
            />
          )}
        />
      </View>
      {/* {currentDetails && (
        <DetailsModal
          closeModalCallback={handleCloseModal}
          modalVisible={showDetailsModalVisbile}
          details={currentDetails}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: "center",
    paddingTop: "5%",
    paddingHorizontal: "5%",
    height: "100%",
  },
  searchBarContainer: {
    width: "100%",
    height: "8%",
    marginBottom: "5%",
    backgroundColor: colors.background_accent,
    color: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
  },
  searchBar: {
    color: colors.primary,
    flex: 1,
  },
  searchIcon: {
    paddingHorizontal: "2%",
  },
  showTypeSelector: {
    marginBottom: "5%",
  },
  searchResultsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  showCard: {
    paddingBottom: "5%",
    paddingRight: "3%",
  },
});

export default SearchScreen;
