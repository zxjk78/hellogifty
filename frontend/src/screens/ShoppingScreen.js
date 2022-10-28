import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SearchResultList, SearchKeywordInput } from '../components/shopping';

const ShoppingScreen = () => {
  return (
    <View>
      <SearchKeywordInput />
      <SearchResultList />
      <Text>ShoppingScreen</Text>
    </View>
  );
};

export default ShoppingScreen;

const styles = StyleSheet.create({});
