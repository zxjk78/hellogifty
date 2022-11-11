import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  SearchResultList,
  SearchKeywordInput,
} from '../components/shopping/search';
const ShoppingScreen = () => {
  return (
    <View>
      <SearchKeywordInput />
      <View style={{ marginTop: '5%' }}></View>
      <SearchResultList />
    </View>
  );
};

export default ShoppingScreen;

const styles = StyleSheet.create({});
