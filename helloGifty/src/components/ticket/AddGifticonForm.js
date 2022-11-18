import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {Button} from 'react-native-paper';
import SelectList from 'react-native-dropdown-select-list';
import CategoryDropdown from '../UI/CategoryDropdown';
import {GlobalStyles} from '../../constants/style';
import {
  largeCategoryDict,
  smallCategoryDict,
} from '../../constants/data/idDictionary';
import {
  largeCategoryData,
  smallCategoryData,
} from '../../constants/data/categoryData';

import {API_URL} from '../../api/config/http-config';

// 부모:
const AddGifticonForm = ({
  gifticon,
  idx,
  isEnd,
  onPrev,
  onNext,
  onNameChange,
  onSmCtChange,
  onLgCtChange,
}) => {
  const [largeChange, setLargeChange] = useState(false);

  const [largeCategoryId, setLargeCategoryId] = useState(-1);
  const [smallCategoryId, setSmallCategoryId] = useState(null);

  const handleName = txt => {
    onNameChange(idx, txt);
  };
  const handleLargeCategory = selectedId => {
    onLgCtChange(idx, selectedId);
    setLargeCategory(selectedId);
  };

  const handleSmallCategory = selectedId => {
    setSmallCategoryId(selectedId);
    onSmCtChange(idx, selectedId);
  };

  const nextHandler = () => {
    onNext();
  };
  const prevHandler = () => {
    onPrev();
  };
  const [largeCategory, setLargeCategory] = useState(
    gifticon.largeCategoryId || 0,
  );
  return (
    <View>
      <ScrollView style={styles.mainContainer}>
        <View>
          <View style={styles.middle}>
            <View>
              <Text style={styles.title}>이름</Text>
              <TextInput
                defaultValue={gifticon.name}
                style={styles.input}
                onChangeText={handleName}
              />
            </View>
            <View style={{flex: 1}} />

            <View
              style={{
                marginTop: '10%',
                flex: 2.5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.title}>유효기간</Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 7,
                    color: GlobalStyles.colors.mainPrimary,
                  }}>
                  {gifticon.expirationDate}
                </Text>
              </View>
              <View>
                <Text style={styles.title}>쿠폰번호</Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 7,
                    color: GlobalStyles.colors.mainPrimary,
                  }}>
                  {gifticon.number}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.categoryContainer}>
            <View>
              <CategoryDropdown
                categoryItem={largeCategoryData}
                onChange={lgCId => {
                  setLargeCategoryId(lgCId);
                  setLargeChange(!largeChange);
                }}
                defaultTxt="대분류"
              />
            </View>
            <View style={{width: '10%'}} />
            <View>
              <CategoryDropdown
                gifticon={gifticon}
                categoryItem={smallCategoryData[largeCategoryId] || null}
                onChange={smCId => handleSmallCategory(smCId)}
                defaultTxt="소분류"
                largeChanged={largeChange}
              />
            </View>
          </View>

          <Image
            source={{
              uri: `data:image/jpeg;base64,${gifticon.couponImg}`,
            }}
            style={styles.couponImage}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={prevHandler}>
          이전
        </Button>

        <Button
          mode="contained"
          onPress={nextHandler}
          disabled={!smallCategoryId}>
          {isEnd ? '완료' : '다음'}
        </Button>
      </View>
    </View>
  );
};

export default AddGifticonForm;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: GlobalStyles.colors.backgroundComponent,
    // backgroundColor: 'red',
    padding: '10%',
    paddingTop: '5%',
    height: '85%',
    // width: '95%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    width: '90%',
  },
  input: {
    // width: '50%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
    padding: 4,
    paddingLeft: 12,
  },
  couponImage: {
    width: '100%',
    height: 500,
    marginTop: '10%',
    resizeMode: 'stretch',
    zIndex: 1,
  },
  buttonContainer: {
    width: '80%',
    marginHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '10%',
  },
  dropdownStyles: {
    overflow: 'scroll',
  },
});
