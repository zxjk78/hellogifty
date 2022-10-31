import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  SearchResultList,
  SearchKeywordInput,
} from '../components/shopping/search';
const ShoppingScreen = () => {
  return (
    <View>
      <Text>ShoppingScreen</Text>
      <SearchKeywordInput />
      <SearchResultList />
    </View>
  );
};

export default ShoppingScreen;

const styles = StyleSheet.create({});
