import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {Button, IconButton} from 'react-native-paper';

import React from 'react';
import {addGifticonFromMms, addGifticonFromMms_test} from '../../api/gifticon';
import Toast from 'react-native-toast-message';
import {smallCategoryDict} from '../../constants/data/idDictionary';
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

const LastCheckItem = ({item, idx, onDelete}) => {
  // console.log(Object.keys(item));
  return (
    <View style={{flexDirection: 'row', borderWidth: 1, margin: 5, padding: 5}}>
      <View>
        <Text
          style={{
            color: 'white',
            backgroundColor: 'red',
            width: 30,
            height: 30,
            borderRadius: 15,
            textAlign: 'center',
            lineHeight: 25,
            position: 'absolute',
            top: 5,
            left: 5,
            zIndex: 10,
          }}>
          {idx + 1}
        </Text>
      </View>
      <Image
        source={{
          uri: item.imgPath,
        }}
        style={{width: 100, height: 100, zIndex: 1, marginRight: 10}}
      />
      <View>
        <View>
          <Text>이름: {item.name}</Text>
          <Text>카테고리이름: {smallCategoryDict[item.categoryId]}</Text>
        </View>
        <View>
          <Text>유효기한: {item.expirationDate}까지</Text>
          <Text>번호: {item.number}</Text>
        </View>
      </View>
      <View>
        <IconButton
          icon="delete"
          mode="contained"
          onPress={() => onDelete(idx)}
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
  // console.log(gifticonArr.length);
  return (
    <ScrollView style={{}}>
      <Text>마지막으로 확인하시고 저장 버튼을 눌러 주세요.</Text>
      {gifticonArr.map((item, index) => (
        <LastCheckItem
          item={item}
          idx={index}
          key={index}
          onDelete={handleDelete}
        />
      ))}
      <View>
        <Button mode="contained" onPress={handleSubmit}>
          제출
        </Button>

        <Button mode="outlined" onPress={onPrev}>
          취소
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddGifticonLastCheck;

// const styles = StyleSheet.create({});
