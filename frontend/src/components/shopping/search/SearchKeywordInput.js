import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { searchByKeyword } from '../../../api/search';
import { GlobalStyles } from '../../../constants/style';
import SearchResultList from './SearchResultList';
const SearchKeywordInput = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [resultDataList, setResultDataList] = useState([{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8}]);
  const [inputBorderColor, setInputBorderColor] = useState('white');

  const onDelete = () => {
    setSearchKeyword('');
    Keyboard.dismiss();
  };

  const inputStyle = {
      padding: 8,
      paddingLeft: 20,
      backgroundColor: 'white',
      borderRadius: 30,
      borderWidth: 3,
      borderColor: inputBorderColor,
      width: '100%',
  }
  const inputFocus = () => {
    setInputBorderColor(GlobalStyles.colors.categoryConven)
  }
  const inputBlur = () => {
    setInputBorderColor('white')
  }

  useEffect(() => {
    // api 보내서 검색 자료 가져오기
    const resultList = [];
    (() => {
      // const result = searchByKeyword(searchKeyword);
      // console.log(result);
      // resultList.push(result);
      // setResultDataList(resultList);
    })();
  }, [searchKeyword]);

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={inputStyle}
          placeholder={'브랜드명 또는 찾고 싶은 제품을 입력해 주세요.'}
          value={searchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}
          onFocus={inputFocus}
          onBlur={inputBlur}
        />
        {searchKeyword.length > 0 && (
          <Icon name="closecircle" onPress={onDelete} style={styles.deleteIcon} />
        )}
      </View>
      <SearchResultList resultDataList={resultDataList}/>
    </>
  );
};

export default SearchKeywordInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    marginLeft: '5%',
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    width: 30,
    height: 20,
    fontSize: 20,
    position: 'relative',
    right: 40,
  },
});