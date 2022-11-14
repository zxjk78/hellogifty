import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { GlobalStyles } from '../constants/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import { enterChatRoom, fetchTradeItemDetail } from '../api/trade';
const SellingItemDetailScreen = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemDetail, setItemDetail] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  // 판매상품 정보 받아오기
  useLayoutEffect(() => {
    setIsLoading(true);
    const tradeItemId = route.params.tradeId;

    (async () => {
      const result = await fetchTradeItemDetail(tradeItemId);

      setItemDetail(result);
    })();
    setIsLoading(false);
  }, []);

  const handleStartChat = async () => {
    // 가짜 seller 아이디 만들고 하기
    const tradeId = 1;
    const sellerId = 1234;
    const myId = await AsyncStorage.getItem('userId');

    const res = await enterChatRoom(tradeId);
    // navigation.navigate('Chat', { screen: 'Chatting' });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image
          style={styles.couponImage}
          source={{
            uri: 'https://photo.coolenjoy.co.kr/data/editor/2012/c0f3b1f7c870df665e0469510699344b98619cf9.jpg',
          }}
        />

        {/* <Image style={styles.couponImage} source={{ uri: itemDetail.img }} />   이미지 조사 필요 = 크롭에서 가져오려고 하는 것 같다. */}
        <View style={styles.profileContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{
                uri: 'https://photo.coolenjoy.co.kr/data/editor/2012/c0f3b1f7c870df665e0469510699344b98619cf9.jpg',
              }}
              style={styles.profileImg}
            />
            <Text
              style={{ fontSize: 20, marginLeft: '10%', fontWeight: 'bold' }}
            >
              {/* {itemDetail.name} */}
              {/* {itemDetail.email} */}
            </Text>
          </View>
          <Image
            source={{
              uri: 'https://photo.coolenjoy.co.kr/data/editor/2012/c0f3b1f7c870df665e0469510699344b98619cf9.jpg',
            }}
            style={styles.profileRank}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={{ fontSize: 20, padding: 5 }}>{itemDetail.content}</Text>
        </View>
      </View>
      <View style={styles.buyContainer}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          {itemDetail.price} 원
        </Text>

        <TouchableOpacity style={styles.chatBtn} onPress={handleStartChat}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>채팅하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SellingItemDetailScreen;

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    marginLeft: '5%',
    flex: 1,
  },
  container: {
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 7,
  },
  couponImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'stretch',
    flex: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 8,

    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  profileRank: {
    width: 40,
    height: 40,
  },
  contentContainer: {
    flex: 4,
    overflow: 'scroll',
  },
  buyContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: GlobalStyles.colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  chatBtn: {
    backgroundColor: 'red',
    width: '40%',
    height: '60%',
    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
