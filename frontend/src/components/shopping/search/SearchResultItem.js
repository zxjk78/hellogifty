import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../../constants/style';

const SearchResultItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri: 'https://photo.coolenjoy.co.kr/data/editor/2012/c0f3b1f7c870df665e0469510699344b98619cf9.jpg',
          }}
          style={{ width: '100%', height: '100%', resizeMode: 'center' }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.brand}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/KakaoTalk_logo.svg/900px-KakaoTalk_logo.svg.png',
            }}
            style={{ width: 20, height: 20, borderRadius: 5 }}
          />
          <View style={{ marginLeft: 10 }}></View>
          <Text>브랜드명</Text>
        </View>
        <Text style={styles.productName}>제품명</Text>
        <Text
          style={{ color: GlobalStyles.colors.textPrimary }}
        >{`유효기한: ${'2020-12-12'}`}</Text>
      </View>
      <View style={styles.otherInfo}>
        <Text>유저이름**</Text>
        <Text>4,300원</Text>
      </View>
    </View>
  );
};

export default SearchResultItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#fff',
    padding: 8,
  },
  imgContainer: {
    flex: 2,
  },
  brand: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 3,
  },
  productName: {
    fontSize: 20,
  },
  otherInfo: {
    justifyContent: 'space-between',
  },
});
