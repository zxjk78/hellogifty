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

import { GlobalStyles } from '../../constants/style';
import {
  largeCategoryDict,
  smallCategoryDict,
} from '../../constants/data/idDictionary';
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
            source={require('../../assets/largeCategory/img0.png')}
            style={{ width: 20, height: 20 }}
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
            source={require('../../assets/largeCategory/img1.png')}
            style={{ width: 20, height: 20 }}
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
            source={require('../../assets/largeCategory/img0.png')}
            style={{ width: 20, height: 20 }}
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
            source={require('../../assets/largeCategory/img1.png')}
            style={{ width: 20, height: 20 }}
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
            source={require('../../assets/largeCategory/img0.png')}
            style={{ width: 20, height: 20 }}
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
            source={require('../../assets/largeCategory/img1.png')}
            style={{ width: 20, height: 20 }}
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
            source={require('../../assets/largeCategory/img0.png')}
            style={{ width: 20, height: 20 }}
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
            source={require('../../assets/largeCategory/img1.png')}
            style={{ width: 20, height: 20 }}
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
            source={require('../../assets/largeCategory/img0.png')}
            style={{ width: 20, height: 20 }}
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
            source={require('../../assets/largeCategory/img1.png')}
            style={{ width: 20, height: 20 }}
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
            source={require('../../assets/largeCategory/img0.png')}
            style={{ width: 20, height: 20 }}
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
            source={require('../../assets/largeCategory/img1.png')}
            style={{ width: 20, height: 20 }}
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
      <ScrollView style={styles.container}>
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

            <View style={{ flex: 2.5 }}>
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
              {/* <TextInput
              defaultValue={gifticon.expirationDate}
              style={styles.input}
              onChangeText={setExpirationDate}
            /> */}
            </View>
          </View>
          <View style={styles.middle}>
            <View style={{ flex: 6, zIndex: 3 }}>
              <Text style={styles.title}>대분류</Text>
              <SelectList
                setSelected={handleLargeCategory}
                // onSelect={resetSmallCategory}
                data={largeCategoryData}
                disabledItemStyles={{
                  backgroundColor: 'red',
                }}
                disabledTextStyles={{ color: 'red' }}
                dropdownStyles={{
                  backgroundColor: '#fff',
                  position: 'absolute',
                  paddingRight: 10,
                  borderColor: 'red',
                }}
                placeholder="대분류"
                boxStyles={{
                  borderColor: 'red',
                }}
                defaultOption={
                  gifticon.largeCategoryId
                    ? largeCategoryData[+gifticon.largeCategoryId]
                    : false
                }
              />
            </View>
            <View style={{ flex: 0.5 }}></View>
            <View style={{ flex: 4, zIndex: 3 }}>
              <Text style={styles.title}>소분류</Text>
              <SelectList
                setSelected={handleSmallCategory}
                // onSelect={(val) => setSmallCategory(val)}
                data={smallCategoryData[largeCategory]}
                disabledItemStyles={{
                  backgroundColor: 'red',
                }}
                dropdownStyles={{
                  backgroundColor: '#fff',
                  position: 'absolute',
                  paddingRight: 10,
                  borderColor: 'red',
                }}
                placeholder="소분류"
                boxStyles={{
                  borderColor: 'red',
                }}
                defaultOption={
                  gifticon.categoryId
                    ? smallCategoryData[+gifticon.largeCategoryId][
                        (+gifticon.categoryId + 1) % 2
                      ]
                    : false
                }
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
  container: {
    backgroundColor: GlobalStyles.colors.backgroundComponent,
    // backgroundColor: 'red',
    padding: '10%',
    paddingTop: '5%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: '5%',
    // borderWidth: 1,
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
    height: 350,
    marginTop: '10%',
    resizeMode: 'stretch',
    zIndex: 1,
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10%',
  },
  dropdownStyles: {
    overflow: 'scroll',
  },
});
