import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Button } from 'react-native-paper';
import SelectList from 'react-native-dropdown-select-list';

import { GlobalStyles } from '../../constants/style';
import { largeCategoryDict } from '../../constants/data/idDictionary';
const AddGifticonForm = ({ idx, gifticon, isEnd, handleNext, handlePrev }) => {
  const [name, setName] = useState(null);
  const [expireDate, setExpireDate] = useState(null);

  const [selected, setSelected] = useState('');
  const data = [
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

  const nextHandler = () => {
    handleNext(idx, {
      name: name || gifticon.name,
      expirationDate: expireDate || gifticon.expirationDate,
      categoryId: selected,
    });
  };
  useLayoutEffect(() => {
    if (gifticon.categoryId) {
      console.log('카테고리: ', gifticon.categoryId);
      setSelected(gifticon.categoryId);
    }
  }, [idx]);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>이름</Text>
          <TextInput
            defaultValue={gifticon.name}
            style={styles.input}
            onChangeText={setName}
          />
        </View>
        <View style={styles.middle}>
          <View style={{ flex: 2.5 }}>
            <Text style={styles.title}>유효기간</Text>
            <TextInput
              defaultValue={gifticon.expirationDate}
              style={styles.input}
              onChangeText={setExpireDate}
            />
          </View>

          <View style={{ flex: 1 }} />
          <View style={{ flex: 4, zIndex: 3 }}>
            <Text style={styles.title}>카테고리</Text>
            <SelectList
              setSelected={setSelected}
              data={data}
              // onSelect={() => alert(selected)}
              dropdownStyles={{
                backgroundColor: '#fff',
                position: 'absolute',
                paddingRight: 10,
                borderColor: 'red',
              }}
              placeholder="카테고리"
              boxStyles={{
                borderColor: 'red',
              }}
              defaultOption={data[selected]}
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
      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={handlePrev}>
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
    height: 300,
    marginTop: '10%',
    zIndex: 1,
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownStyles: {},
});
