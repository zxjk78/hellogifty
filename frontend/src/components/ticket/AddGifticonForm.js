import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Button } from 'react-native-paper';
import SelectList from 'react-native-dropdown-select-list';
import CategoryDropdown from '../UI/CategoryDropdown';
import { GlobalStyles } from '../../constants/style';
import {
  largeCategoryDict,
  smallCategoryDict,
} from '../../constants/data/idDictionary';
import { API_URL } from '../../api/config/http-config';
import B64Image from '../UI/B64Image';

const smallImgConfig = {
  width: 30,
  height: 30,
};

const largeCategoryData = [
  {
    key: 0,
    value: (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/largeCategory/img0.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text>{largeCategoryDict[0]}</Text>
      </View>
    ),
  },
  {
    key: 1,
    value: (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/largeCategory/img1.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text>{largeCategoryDict[1]}</Text>
      </View>
    ),
  },
  {
    key: 2,
    value: (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/largeCategory/img2.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text>{largeCategoryDict[2]}</Text>
      </View>
    ),
  },
  {
    key: 3,
    value: (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/largeCategory/img3.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text>{largeCategoryDict[3]}</Text>
      </View>
    ),
  },
  {
    key: 4,
    value: (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/largeCategory/img4.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text>{largeCategoryDict[4]}</Text>
      </View>
    ),
  },
  {
    key: 5,
    value: (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/largeCategory/img5.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text>{largeCategoryDict[5]}</Text>
      </View>
    ),
  },
];
const smallCategoryData = [
  [
    {
      key: 1,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/STARBUCKS.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[1]}</Text>
        </View>
      ),
    },
    {
      key: 2,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/TWOSOMEPLACE.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[2]}</Text>
        </View>
      ),
    },
  ],
  [
    {
      key: 3,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/CU.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[3]}</Text>
        </View>
      ),
    },
    {
      key: 4,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/GS25.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[4]}</Text>
        </View>
      ),
    },
  ],
  [
    {
      key: 5,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/PARISBAGUETTE.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[5]}</Text>
        </View>
      ),
    },
    {
      key: 6,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/TOUSLESJOURS.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[6]}</Text>
        </View>
      ),
    },
  ],
  [
    {
      key: 7,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/BASKINROBBINS.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[7]}</Text>
        </View>
      ),
    },
    {
      key: 8,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/SEOLBING.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[8]}</Text>
        </View>
      ),
    },
  ],
  [
    {
      key: 9,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/BHC.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[9]}</Text>
        </View>
      ),
    },
    {
      key: 10,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/DOMINO.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[10]}</Text>
        </View>
      ),
    },
  ],
  [
    {
      key: 11,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/HAPPYCON.jpg')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[11]}</Text>
        </View>
      ),
    },
    {
      key: 12,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/smallCategory/CGV.png')}
            style={smallImgConfig}
          />

          <Text>{smallCategoryDict[12]}</Text>
        </View>
      ),
    },
  ],
];
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
  const [categoryId, setCategoryId] = useState(-1);

  const [largeCategoryId, setLargeCategoryId] = useState(-1);

  const handleName = (txt) => {
    onNameChange(idx, txt);
  };
  const handleLargeCategory = (selectedId) => {
    onLgCtChange(idx, selectedId);
    setLargeCategory(selectedId);
  };

  const handleSmallCategory = (selectedId) => {
    onSmCtChange(idx, selectedId);
  };

  const nextHandler = () => {
    onNext();
  };
  const prevHandler = () => {
    onPrev();
  };
  const [largeCategory, setLargeCategory] = useState(
    gifticon.largeCategoryId || 0
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
            <View style={{ flex: 1 }}></View>

            <View
              style={{
                marginTop: '10%',
                flex: 2.5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={styles.title}>유효기간</Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 7,
                    color: GlobalStyles.colors.mainPrimary,
                  }}
                >
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
                  }}
                >
                  {gifticon.number}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.categoryContainer}>
            <View>
              <CategoryDropdown
                categoryItem={largeCategoryData}
                onChange={(lgCId) => setLargeCategoryId(lgCId)}
                defaultTxt="대분류"
              />
            </View>
            <View style={{ width: '10%' }}></View>
            <View>
              <CategoryDropdown
                categoryItem={smallCategoryData[largeCategoryId] || null}
                onChange={(smCId) => handleSmallCategory(smCId)}
                defaultTxt="소분류"
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

        <Button mode="contained" onPress={nextHandler}>
          {isEnd ? `완료` : `다음`}
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
