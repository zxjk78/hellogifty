import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import SearchResultItem from "./SearchResultItem";
const SearchResultList = ({resultDataList}) => {
  // console.log(resultDataList, "dataList~~");
  return (
    <ScrollView>
      <View style={{marginBottom: 70}}>
        {resultDataList.map((resultItem) => (
          <SearchResultItem resultItem={resultItem} key={resultItem.id} />
        ))}
      </View>
    </ScrollView>
  );
};

export default SearchResultList;

const styles = StyleSheet.create({});
