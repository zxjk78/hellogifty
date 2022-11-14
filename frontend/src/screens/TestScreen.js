import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { AddGifticon } from '../api/gifticon';

const TestScreen = () => {
  const [gifticonInfo, setGifticonInfo] = useState({
    name: '더미',
    expireDate: '2021-12-12',
    categoryId: 12,
    number: '123-12-12',
  });
  const addGifticon = async () => {
    const res = await AddGifticon(gifticonInfo);
  };
  return (
    <View>
      <Text>TestScreen</Text>
      <Text>제목</Text>
      <TextInput style={{ borderWidth: 2, padding: 10 }} />
      <Text>아이디</Text>
      <TextInput style={{ borderWidth: 2, padding: 10 }} />

      <Button onPress={addGifticon}>기프티콘 파일에서 추가버튼</Button>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
