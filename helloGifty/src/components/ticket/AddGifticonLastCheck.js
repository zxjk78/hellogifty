import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Button, IconButton} from 'react-native-paper';

import React from 'react';
import {addGifticonFromMms, addGifticonFromMms_test} from '../../api/gifticon';
import Toast from 'react-native-toast-message';
import {smallCategoryDict} from '../../constants/data/idDictionary';
import {GlobalStyles} from '../../constants/style';
const showToast = () => {
  Toast.show({
    type: 'success',
    text1: '😊 쿠폰 등록이 완료되었습니다.✔️',
    position: 'top',
    visibilityTime: 4000,
    topOffset: 10,
    // onShow: () => {},
    // onHide: () => {},
  });
};

const smallCategoryImgArr = [
  require('../../assets/smallCategory/STARBUCKS.png'),
  require('../../assets/smallCategory/TWOSOMEPLACE.png'),
  require('../../assets/smallCategory/CU.png'),
  require('../../assets/smallCategory/GS25.png'),
  require('../../assets/smallCategory/PARISBAGUETTE.png'),
  require('../../assets/smallCategory/TOUSLESJOURS.png'),
  require('../../assets/smallCategory/BASKINROBBINS.png'),
  require('../../assets/smallCategory/SEOLBING.png'),
  require('../../assets/smallCategory/BHC.png'),
  require('../../assets/smallCategory/DOMINO.png'),
  require('../../assets/smallCategory/HAPPYCON.jpg'),
  require('../../assets/smallCategory/CGV.png'),
];

const LastCheckItem = ({item, idx, onDelete}) => {
  // console.log(Object.keys(item));
  return (
    <View
      style={{flexDirection: 'row', borderWidth: 1, margin: 5, padding: 10}}>
      <Image
        source={{
          uri: item.imgPath,
        }}
        style={{
          width: 100,
          height: 100,
          marginRight: 10,
          resizeMode: 'contain',
        }}
      />
      <View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={smallCategoryImgArr[item.categoryId - 1]}
            style={{width: 30, height: 30, marginRight: 10}}
          />
          <Text>
            {item.name.length > 14 ? item.name.slice(0, 12) + '...' : item.name}
          </Text>
        </View>
        <View>
          <Text>{`일련번호\n${item.number}`}</Text>
          <Text style={{textAlign: 'right', marginTop: 10, marginLeft: 110}}>
            {item.expirationDate}까지
          </Text>
        </View>
      </View>
      <View style={{position: 'absolute', right: 5}}>
        <IconButton
          icon="delete"
          mode="contained"
          onPress={() => onDelete(idx)}
          style={{backgroundColor: '#fda172'}}
          iconColor="#fff"
        />
      </View>
    </View>
  );
};

const AddGifticonLastCheck = ({
  gifticonArr,
  onPrev,
  onSuccess,
  onSubmitItemDelete,
}) => {
  const handleSubmit = async () => {
    const result = await addGifticonFromMms_test(gifticonArr);

    showToast();
    if (result) {
      onSuccess();
    }
  };
  const handleDelete = idx => {
    onSubmitItemDelete(idx);
  };
  console.log(gifticonArr.length);
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{paddingHorizontal: '5%'}}>
        <Text
          style={{
            color: GlobalStyles.colors.mainPrimary,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          마지막 확인 후 저장 버튼을 눌러 주세요.
        </Text>
        {gifticonArr.map((item, index) => (
          <LastCheckItem
            item={item}
            idx={index}
            key={index}
            onDelete={handleDelete}
          />
        ))}
      </ScrollView>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-around',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 30,
        }}>
        <Button
          mode="outlined"
          onPress={onPrev}
          style={{
            borderColor: GlobalStyles.colors.mainPrimary,
          }}
          textColor={GlobalStyles.colors.mainPrimary}>
          다시 확인하기
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={{
            backgroundColor: GlobalStyles.colors.mainPrimary,
            color: '#fff',
          }}>
          저장하기
        </Button>
      </View>
    </View>
  );
};

export default AddGifticonLastCheck;

// const styles = StyleSheet.create({});
