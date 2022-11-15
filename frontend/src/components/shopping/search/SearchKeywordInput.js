import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { searchByKeyword } from '../../../api/search';
import { GlobalStyles } from '../../../constants/style';
import SearchResultList from './SearchResultList';
const SearchKeywordInput = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLargeCategoryId, setSearchLargeCategoryId] = useState();
  const [searchSmallCategoryId, setSearchSmallCategoryId] = useState();
  const [resultDataList, setResultDataList] = useState(null);
  const [inputBorderColor, setInputBorderColor] = useState('white');
  const [isLoading, setIsLoading] = useState(true);

  const onDelete = () => {
    setSearchKeyword('');
  };

  const inputStyle = {
    padding: 8,
    paddingLeft: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: inputBorderColor,
    width: '100%',
  };
  const inputFocus = () => {
    setInputBorderColor(GlobalStyles.colors.categoryConven);
  };
  const inputBlur = () => {
    setInputBorderColor('white');
  };

  useEffect(() => {
    setIsLoading(true);
    // api 보내서 검색 자료 가져오기
    (async () => {
      const result = await searchByKeyword('');
      setResultDataList(result);
      // console.log(result, '처음 데이터 가져왔습니다.');
    })();
    setIsLoading(false);
  }, []);

  const search = () => {
    (async () => {
      const result = await searchByKeyword(searchKeyword);
      setResultDataList(result);
    })();
    Keyboard.dismiss();
  };

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
          <Icon name="search1" onPress={search} style={styles.searchIcon} />
        )}
        {searchKeyword.length > 0 && (
          <Icon
            name="closecircle"
            onPress={onDelete}
            style={styles.deleteIcon}
          />
        )}
      </View>
      {!isLoading && resultDataList && (
        <SearchResultList resultDataList={resultDataList} />
      )}
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
  searchIcon: {
    width: 30,
    height: 20,
    fontSize: 20,
    position: 'relative',
    right: 70,
  },
  deleteIcon: {
    width: 30,
    height: 20,
    fontSize: 20,
    position: 'relative',
    right: 65,
  },
});
