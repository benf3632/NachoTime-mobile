import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";

// icons
import Ionicons from "react-native-vector-icons/Ionicons";
import DetailsModal from "../components/DetailsModal";

// components
import SelectSlider from "../components/SelectSlider";
import ShowDetailsCard from "../components/ShowDetailsCard";

// constants
import colors from "../constants/colors";

// helpers
import { queryMovies } from "../helper/yts";

const SearchScreen = () => {
  const [searchInput, onSearchInputChange] = useState("");
  const [searchShowType, setSearchShowType] = useState(0);
  const [searchResult, setSearchResults] = useState([]);
  const [showDetailsModalVisbile, setShowDetailsModalVisbile] = useState(false);
  const [currentDetails, setCurrentDetails] = useState(null);

  const search = async () => {
    let searchResults;
    if (searchShowType === 0) {
      searchResults = await queryMovies(searchInput, 1, 20);
    } else {
      searchResults = [];
    }
    setSearchResults(searchResults);
  };

  const handleDetailsCardPressed = item => {
    setCurrentDetails(item);
    setShowDetailsModalVisbile(true);
  };

  const handleCloseModal = () => {
    setCurrentDetails(null);
    setShowDetailsModalVisbile(false);
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
      <FlatList
        data={searchResult}
        keyExtractor={item => item.imdb_code}
        numColumns={3}
        renderItem={({ item }) => (
          <ShowDetailsCard
            style={styles.showCard}
            onPress={() => handleDetailsCardPressed(item)}
            details={item}
          />
        )}
      />
      {currentDetails && (
        <DetailsModal
          closeModalCallback={handleCloseModal}
          modalVisible={showDetailsModalVisbile}
          details={currentDetails}
        />
      )}
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
  showCard: {
    paddingBottom: "5%",
  },
});

export default SearchScreen;
