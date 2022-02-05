import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import WebView from "react-native-webview";
import { useSelector, useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";

// components
import DetailsCard from "../components/DetailsCard";

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
    <View style={[{ width: "100%", height: "100%" }, tw`p-2 bg-gray-800`]}>
      {currentDetails && (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View
            style={[
              {
                backgroundColor: "#393942",
                elevation: 5,
              },
              tw`flex justify-center items-center m-10`,
            ]}>
            <ScrollView>
              <WebView
                style={{ width: 200, height: 100 }}
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction
                source={{
                  uri: `https://youtube.com/embed/${currentDetails.yt_trailer_code}`,
                }}
              />
              <Button
                onPress={() => setModalVisibile(false)}
                title="Close Modal"
              />
            </ScrollView>
          </View>
        </Modal>
      )}
      <FlatList
        data={movies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={tw`mt-2 mb-2`}>
            <DetailsCard
              onPress={handleDetailsCardPressed.bind(item)}
              details={item}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
