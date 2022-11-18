import {
  StyleSheet,
  Keyboard,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import {
  SearchKeywordInput,
} from "../components/shopping/search";

const ShoppingScreen = () => {
  return (
    <View>
      <SearchKeywordInput />
    </View>
  );
};

export default ShoppingScreen;

const styles = StyleSheet.create({});
