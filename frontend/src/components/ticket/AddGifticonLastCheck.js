import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React from 'react';
import { AddGifticon } from '../../api/gifticon';

const LastCheckItem = ({ item, idx }) => {
  // console.log(item);
  return (
    <View style={{}}>
      <View style={{}}>
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
          }}
        >
          {idx + 1}
        </Text>
      </View>
      <Image
        source={{
          uri: `data:image/jpeg;base64,${item.couponImg}`,
        }}
        style={{ width: 150, height: 150, zIndex: 1 }}
      />
    </View>
  );
};

const AddGifticonLastCheck = ({ gifticonArr }) => {
  const handleSubmit = async () => {
    // byteCode는 이미지로 바꾸어서 formData에 담아 전송하기

    const result = await AddGifticon(gifticonArr);
  };

  return (
    <View style={{}}>
      <Text>마지막으로 확인하시고 저장 버튼을 눌러 주세요.</Text>
      {gifticonArr.map((item, index) => (
        <LastCheckItem item={item} idx={index} key={item.id} />
      ))}
      <Button title="제출" onPress={handleSubmit} />
    </View>
  );
};

export default AddGifticonLastCheck;

const styles = StyleSheet.create({});
