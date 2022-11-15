import { StyleSheet, View, ScrollView, Text } from "react-native";
import React from "react";
import SearchResultItem from "./SearchResultItem";
const SearchResultList = ({ resultDataList }) => {
  console.log(resultDataList, "dataList~~");
  return (
    <ScrollView>
      <View style={{ marginBottom: 70 }}>
        {/* {resultDataList.length > 0
          ? resultDataList.map((resultItem) => (
              <SearchResultItem resultItem={resultItem} key={resultItem.id} />
            ))
          : 
            <View><Text>검색 결과가 없습니다.</Text></View>
        } */}

      </View>
    </ScrollView>
  );
};

export default SearchResultList;

const styles = StyleSheet.create({});
