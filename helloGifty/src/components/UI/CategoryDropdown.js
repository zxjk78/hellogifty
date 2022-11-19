import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import SelectDropdown from 'react-native-select-dropdown';

import {GlobalStyles} from '../../constants/style';
const CategoryDropdown = ({
  categoryItem,
  onChange,
  defaultTxt,
  largeChanged,
  gifticon,
  reset,
}) => {
  const dropdownRef = useRef({});
  const selectItem = selectedItem => {
    return (
      <View>
        {selectedItem ? (
          <Text>{selectedItem.value}</Text>
        ) : (
          <Text>{defaultTxt}</Text>
        )}
      </View>
    );
  };
  // 소분류 영역이면 리셋시킴
  useEffect(() => {
    if (categoryItem?.length === 2) {
      // 라이브러리에 메소드 사용법이 적혀있었음
      dropdownRef.current.reset();
    }
    if (!reset) {
      dropdownRef.current.reset();
    }
  }, [categoryItem?.length, largeChanged, reset]);

  // 기프티콘 이동했을 때 리셋시키기 만들기
  useEffect(() => {
    dropdownRef.current.reset();
  }, [gifticon]);

  return (
    <View>
      <SelectDropdown
        data={categoryItem}
        ref={dropdownRef}
        defaultButtonText={defaultTxt}
        onSelect={selectedItem => {
          // 여기서 set함수 써서 state 변경
          // console.log('내가 선택한 선택지 아이디값', selectedItem.key);
          onChange(selectedItem.key);
        }}
        buttonTextAfterSelection={selectedItem => {
          // 선택 후 selecttion 창에 보이는 선택지
          return selectedItem.value;
        }}
        rowTextForSelection={item => {
          // 여기서 선택지 dropdown을 봄
          return item.value;
        }}
        buttonStyle={styles.commonSelectStyle}
        dropdownStyle={{...styles.commonSelectStyle, ...styles.itemStyle}}
        renderCustomizedButtonChild={selectedItem => selectItem(selectedItem)}
        renderCustomizedRowChild={selectedItem => (
          <View>{selectedItem.value}</View>
        )}
      />
    </View>
  );
};

export default CategoryDropdown;

const styles = StyleSheet.create({
  commonSelectStyle: {
    width: 150,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.mainPrimary,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  itemStyle: {
    paddingHorizontal: 5,
  },
});
