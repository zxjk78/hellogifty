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
// import { LocaleConfig } from 'react-native-calendars';

import { Calendar } from 'react-native-calendars';

import CategoryDropdown from '../UI/CategoryDropdown';
import { GlobalStyles } from '../../constants/style';
import { fetchBrandImage } from '../../api/image';
import { API_URL } from '../../api/config/http-config';
import CustomCalendar from '../UI/CustomCalendar';
import { useNavigation } from '@react-navigation/native';
import {
  largeCategoryData,
  smallCategoryData,
} from '../../constants/data/categoryData';

const AddGifticonFromFileModal = ({ visible, onClose, onRefresh }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [fileBase64, setFileBase64] = useState('');
  const [categoryId, setCategoryId] = useState(-1);
  const navigation = useNavigation();
  const [largeCategoryId, setLargeCategoryId] = useState(-1);
  const [largeChanged, setLargeChanged] = useState(true);
  // const [smallCategoryId, setSmallCategoryId] = useState(-1);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleOpenCalendar = () => {
    setIsCalendarVisible(true);
  };

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

      onRefresh();
      onClose();

      // 여력 있으면 toast 넣어서 알리기
    }
  };
  return (
    <>
      <Modal
        style={styles.calendarModal}
        visible={isCalendarVisible}
        animationType="fade"
      >
        <CustomCalendar
          handleModalClose={() => setIsCalendarVisible(false)}
          onDateChange={(date) => setExpirationDate(date)}
          selectedDate={expirationDate}
        />
      </Modal>
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
                // justifyContent: 'space-between',
                marginTop: '10%',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <TextInput
                style={{ flex: 0.7 }}
                label="기프티콘 번호"
                value={number}
                mode="outlined"
                onChangeText={(text) => setNumber(text)}
              />
              <View style={{ flex: 0.3 }} />
              <Button mode="outlined" onPress={handleOpenCalendar}>
                {expirationDate.length > 0 ? expirationDate : '날짜 정하기'}
              </Button>
            </View>

            <View style={styles.categoryContainer}>
              <View>
                <CategoryDropdown
                  categoryItem={largeCategoryData}
                  onChange={(lgCId) => {
                    setLargeCategoryId(lgCId);

                    setLargeChanged(!largeChanged);
                  }}
                  defaultTxt="대분류"
                />
              </View>
              <View style={{ width: '10%' }}></View>
              <View>
                <CategoryDropdown
                  categoryItem={smallCategoryData[largeCategoryId] || null}
                  onChange={(smCId) => setCategoryId(smCId)}
                  largeChanged={largeChanged}
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
    </>
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
  calendarModal: {},
});
