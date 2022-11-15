import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../../constants/style';
import { useNavigation } from '@react-navigation/native';
import B64Image from '../../UI/B64Image';
import { API_URL } from '../../../api/config/http-config';

const SearchResultItem = ({ resultItem }) => {
  const navigation = useNavigation();
  console.log('검색 결과 아이템:\n', resultItem);
  const handleDetail = () => {
    console.log('상세 조회 시도', resultItem.id);

    navigation.navigate('ShoppingDetail', {
      tradeId: resultItem.id,
      // tradeId: 1,
    });
  };
  return (
    <Pressable style={styles.container} onPress={handleDetail}>
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
          <B64Image
            src={API_URL + 'image/brand?path=' + resultItem.brandImg}
            style={{ width: 20, height: 20, borderRadius: 5 }}
          />

          <View style={{ marginLeft: 10 }}></View>
          <Text>{resultItem.brandName}</Text>
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
    </Pressable>
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
