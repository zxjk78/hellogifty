import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constants/style';
const SearchKeywordInput = () => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={'브랜드명 또는 찾고 싶은 제품을 입력해 주세요.'}
      />
    </View>
  );
};

export default SearchKeywordInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    marginLeft: '5%',
  },
  input: {
    padding: 8,
    paddingLeft: 20,
    backgroundColor: GlobalStyles.colors.textDisable,
    borderRadius: 30,
  },
});
