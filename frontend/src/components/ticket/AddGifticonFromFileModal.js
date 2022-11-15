import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { addGifticonFromFile } from '../../api/gifticon';
import {
  largeCategoryDict,
  smallCategoryDict,
} from '../../constants/data/idDictionary';
import { launchImageLibrary } from 'react-native-image-picker';

import CategoryDropdown from '../UI/CategoryDropdown';
import { GlobalStyles } from '../../constants/style';
import { fetchBrandImage } from '../../api/image';
import B64Image from '../UI/B64Image';
import { API_URL } from '../../api/config/http-config';
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
const smallImgConfig = {
  width: 30,
  height: 30,
};

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

const AddGifticonFromFileModal = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [fileBase64, setFileBase64] = useState('');
  const [categoryId, setCategoryId] = useState(-1);

  const [largeCategoryId, setLargeCategoryId] = useState(-1);
  // const [smallCategoryId, setSmallCategoryId] = useState(-1);

  const selectImageFromFile = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 600,
      maxHeight: 1000,
      includeBase64: true,
    };
    const result = await launchImageLibrary(options);

    setFileBase64(result.assets[0].base64);
  };
  const addGifticon = async () => {
    if (
      !(
        name.length > 0 &&
        number.length > 0 &&
        categoryId > 0 &&
        fileBase64.length > 0 &&
        expirationDate.length > 0
      )
    )
      return;

    const result = await addGifticonFromFile({
      name,
      // number,
      categoryId,
      fileBase64,
      expirationDate,
    });

    if (result) {
      setNumber('');
      setName('');
      setExpirationDate('');
      setLargeCategoryId(-1);
      setCategoryId(-1);
      setFileBase64('');
      onClose();
      // 여력 있으면 toast 넣어서 알리기
    }
  };
  return (
    <Modal animationType="slide" style={{ flex: 1 }} visible={visible}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            width: '90%',
            marginLeft: '5%',
            marginTop: '10%',
            minHeight: '80%',
            flex: 8,
          }}
        >
          <Text style={styles.header}>파일에서 기프티콘 추가</Text>
          <TextInput
            label="이름"
            value={name}
            mode="outlined"
            onChangeText={(text) => setName(text)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '10%',
            }}
          >
            <TextInput
              style={{ flex: 1 }}
              label="기프티콘 번호"
              value={number}
              mode="outlined"
              onChangeText={(text) => setNumber(text)}
            />
            <TextInput
              style={{ flex: 1 }}
              label="유효기간"
              value={expirationDate}
              mode="outlined"
              onChangeText={(text) => setExpirationDate(text)}
            />
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
                onChange={(smCId) => setCategoryId(smCId)}
                defaultTxt="소분류"
              />
            </View>
          </View>

          <View style={styles.imgContainer}>
            <Text
              style={{
                color: GlobalStyles.colors.mainPrimary,
                fontSize: 20,
                fontWeight: 'bold',
                marginVertical: '3%',
              }}
            >
              쿠폰 이미지
            </Text>
            <Pressable
              onPress={selectImageFromFile}
              style={{ alignItems: 'center' }}
            >
              {fileBase64.length > 0 ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${fileBase64}` }}
                  style={{
                    width: 300,
                    height: 400,
                    backgroundColor: '#d3d3d3',
                  }}
                />
              ) : (
                <View style={styles.selectImgeContainer}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: GlobalStyles.colors.mainPrimary,
                    }}
                  >
                    이미지를 선택해 주세요
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </ScrollView>
        <View style={styles.btnContainer}>
          <Button mode="outlined" onPress={onClose}>
            취소하기
          </Button>
          <Button mode="contained" onPress={addGifticon}>
            제출하기
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default AddGifticonFromFileModal;

const styles = StyleSheet.create({
  smallCategoryImg: {
    width: 30,
    height: 30,
  },
  imgContainer: {
    width: '100%',
    height: '30%',
  },
  selectImgeContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',

    paddingHorizontal: 16,
    paddingVertical: 8,
    borderStyle: 'dashed',
    borderColor: GlobalStyles.colors.mainPrimary,
    borderWidth: 2,
  },
  header: {
    fontSize: 25,
    marginBottom: '10%',
    color: GlobalStyles.colors.mainPrimary,
    fontWeight: 'bold',
  },
  btnContainer: {
    width: '80%',
    marginLeft: '10%',
    paddingVertical: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flex: 1,
  },
  categoryContainer: {
    marginTop: '10%',
    flexDirection: 'row',
  },
});
