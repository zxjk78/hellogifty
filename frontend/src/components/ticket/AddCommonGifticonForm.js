import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import SelectList from 'react-native-dropdown-select-list';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { GlobalStyles } from '../../constants/style';
import { largeCategoryDict } from '../../constants/data/idDictionary';
const AddCommonGifticonForm = ({ idx, isEnd, onPrev, onNext, onSubmit }) => {
  const [name, setName] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [selected, setSelected] = useState('');
  const [pickedImageURI, setPickedImageURI] = useState('');
  // console.log(gifticon);
  const categoryData = [
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
    onNext(idx, {
      name: name || gifticon.name,
      expirationDate: expirationDate || gifticon.expirationDate,
      categoryId: selected,
      couponImg: gifticon.couponImg,
    });
  };
  const findGifticon = () => {
    console.log('기프티콘을 찾습니다.');
    // const options = {
    //   maxWidth: 2000,
    //   maxHeight: 2000,
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };
    // launchImageLibrary(options, (res) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     const source = { uri: response?.uri };
    //     console.log(source);
    //     setPickedImageURI(source);
    //   }
    // });
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>이름</Text>
          <TextInput style={styles.input} onChangeText={setName} />
        </View>
        <View style={styles.middle}>
          <View style={{ flex: 2.5 }}>
            <Text style={styles.title}>유효기간</Text>
            <TextInput style={styles.input} onChangeText={setExpirationDate} />
          </View>

          <View style={{ flex: 1 }} />
          <View style={{ flex: 4, zIndex: 3 }}>
            <Text style={styles.title}>카테고리</Text>
            <SelectList
              setSelected={setSelected}
              data={categoryData}
              onSelect={() => {
                setSelected(selected);
              }}
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
            />
          </View>
        </View>

        {pickedImageURI.length === 0 ? (
          <Button
            mode="contained"
            style={{ marginVertical: 100 }}
            onPress={findGifticon}
          >
            이미지 선택하기
          </Button>
        ) : (
          <Image
            source={{
              uri: pickedImageURI,
            }}
            style={styles.couponImage}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={nextHandler}>
          {'등록'}
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddCommonGifticonForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.backgroundComponent,

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
  dropdownStyles: {},
});
