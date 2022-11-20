import {StyleSheet, View, ScrollView, Text, FlatList} from 'react-native';
import Button from 'react-native-paper';
import React, {useEffect} from 'react';
import SearchResultItem from './SearchResultItem';
const SearchResultList = ({resultDataList, nextPage}) => {
  useEffect(() => {}, [resultDataList]);
  return (
    <>
      <ScrollView style={{marginBottom: 70}}>
        {resultDataList.length > 0 ? (
          resultDataList.map(resultItem => (
            <SearchResultItem resultItem={resultItem} key={resultItem.id} />
          ))
        ) : (
          <View>
            <Text>검색 결과가 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default SearchResultList;

const styles = StyleSheet.create({});
