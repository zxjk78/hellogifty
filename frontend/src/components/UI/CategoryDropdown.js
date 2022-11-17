import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {
  largeCategoryDict,
  smallCategoryDict,
} from '../../constants/data/idDictionary';
import { GlobalStyles } from '../../constants/style';
const CategoryDropdown = ({
  categoryItem,
  onChange,
  defaultTxt,
  largeChanged,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // console.log('대분류 바뀜');
    if (categoryItem?.length == 2) {
      console.log('바뀌고 소분류 변경');
      setSelectedItem(null);
    }
  }, [largeChanged]);

  return (
    <View>
      <SelectDropdown
        data={categoryItem}
        onSelect={(selectedItem) => {
          // 여기서 set함수 써서 state 변경
          // console.log('내가 선택한 선택지 아이디값', selectedItem.key);
          onChange(selectedItem.key);
        }}
        buttonTextAfterSelection={(selectedItem) => {
          // 선택 후 selecttion 창에 보이는 선택지
          return selectedItem.value;
        }}
        rowTextForSelection={(item) => {
          // 여기서 선택지 dropdown을 봄
          return item.value;
        }}
        buttonStyle={styles.commonSelectStyle}
        dropdownStyle={{ ...styles.commonSelectStyle, ...styles.itemStyle }}
        renderCustomizedButtonChild={(selectedItem) => (
          <View>
            {selectedItem ? (
              <Text>{selectedItem.value}</Text>
            ) : (
              <Text>{defaultTxt}</Text>
            )}
          </View>
        )}
        renderCustomizedRowChild={(selectedItem) => (
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
