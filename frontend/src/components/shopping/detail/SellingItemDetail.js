import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const SellingItemDetail = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://photo.coolenjoy.co.kr/data/editor/2012/c0f3b1f7c870df665e0469510699344b98619cf9.jpg',
        }}
        style={{ width: '100%', height: '100%', resizeMode: 'center' }}
      />
    </View>
  );
};

export default SellingItemDetail;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
