import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { searchByKeyword } from '../../../api/search';
import { GlobalStyles } from '../../../constants/style';
const SearchKeywordInput = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const onDelete = () => {
    setSearchKeyword('');
  };

  useEffect(() => {
    (() => {
      // const result = searchByKeyword(searchKeyword);
      // console.log(result);
    })();
  }, [searchKeyword]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={'브랜드명 또는 찾고 싶은 제품을 입력해 주세요.'}
        value={searchKeyword}
        onChangeText={(text) => setSearchKeyword(text)}
      />
      {searchKeyword.length > 0 && (
        <Icon name="closecircle" onPress={onDelete} style={styles.deleteIcon} />
      )}
    </View>
  );
};

export default SearchKeywordInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 8,
    paddingLeft: 20,
    backgroundColor: GlobalStyles.colors.textDisable,
    borderRadius: 30,
    width: '100%',
  },
  deleteIcon: {
    width: 30,
    height: 20,
    fontSize: 20,
    position: 'relative',
    right: 40,
  },
});
