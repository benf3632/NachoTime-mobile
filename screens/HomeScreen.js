import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import WebView from "react-native-webview";
import { useSelector, useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";

// components
import DetailsCard from "../components/DetailsCard";
import DetailsModal from "../components/DetailsModal";

// actions
import { incrementPage, setPage, addMovies } from "../slices/moviesSlice";

// selectors
import { selectPage, selectMovies } from "../slices/moviesSlice";

const HomeScreen = () => {
  const page = useSelector(selectPage);
  const movies = useSelector(selectMovies);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisibile] = useState(false);
  const [currentDetails, setCurrentDetails] = useState(null);

  const handleDetailsCardPressed = details => {
    setCurrentDetails(details);
    setModalVisibile(true);
  };

  return (
    <View style={styles.screen}>
      {currentDetails && (
        <DetailsModal
          closeModalCallback={() => setModalVisibile(false)}
          modalVisible={modalVisible}
          currentDetails={currentDetails}
        />
      )}
      <FlatList
        data={movies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={tw`mt-2 mb-2`}>
            <DetailsCard
              onPress={() => handleDetailsCardPressed(item)}
              details={item}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { width: "100%", height: "100%", backgroundColor: "#181826" },
});

export default HomeScreen;
