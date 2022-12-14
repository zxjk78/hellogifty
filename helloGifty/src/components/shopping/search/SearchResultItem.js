import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {GlobalStyles} from '../../../constants/style';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '../../../api/config/http-config';
import {AddComma} from '../../../utils/regexp';
import CustomImage from '../../UI/CustomImage';

const SearchResultItem = ({resultItem}) => {
  const navigation = useNavigation();
  // console.log('검색 결과 아이템:\n', resultItem);
  const handleDetail = () => {
    console.log('상세 조회 시도', resultItem.id);

    navigation.navigate('ShoppingDetail', {
      tradeId: resultItem.id,
      // tradeId: 1,
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleDetail}>
      <View style={styles.imgContainer}>
        <CustomImage
          source={API_URL + 'image/gifticon-cropped?path=' + resultItem.cropImg}
          style={{width: '100%', height: '100%', resizeMode: 'center'}}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.brand}>
          <CustomImage
            source={API_URL + 'image/brand?path=' + resultItem.brandImg}
            style={{width: 20, height: 20, borderRadius: 5}}
          />

          <View style={{marginLeft: 10}}></View>
          <Text>{resultItem.brandName}</Text>
        </View>
        <Text style={styles.productName}>{resultItem.title}</Text>
        {/* <Text style={styles.productName}>{resultItem.gifticonName}</Text> */}
        <Text
          style={{
            color: GlobalStyles.colors.textPrimary,
          }}>{`유효기한: ${resultItem.expirationDate}`}</Text>
      </View>
      <View style={styles.otherInfo}>
        <Text>{resultItem.userName}</Text>
        <Text>{AddComma(resultItem.price)} 원</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 150,
    backgroundColor: '#fff',
    padding: 8,
    borderWidth: 1,
    // borderRadius: 5,
    borderColor: 'black',
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
