import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {GlobalStyles} from '../constants/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import CustomImage from '../components/UI/CustomImage';
import {enterChatRoom, fetchTradeItemDetail} from '../api/trade';

import {API_URL} from '../api/config/http-config';
import {AddComma} from '../utils/regexp';

const badgeArr = [
  // require('../../assets/level/Bronze.png'),
  require('../assets/level/Silver.png'),
  require('../assets/level/Gold.png'),
  require('../assets/level/Platinum.png'),
  require('../assets/level/Master.png'),
];

const calculateBadge = level => {
  // 현재 레벨 다음의 수 찾기
  const expList = [50, 120, 150, 200];

  const nxtExpIdx = expList.reduce((acc, exp, index, _arr) => {
    if (level < exp && acc === -1) {
      return index;
    } else {
      return acc;
    }
  }, -1);
  return nxtExpIdx;
};

const SellingItemDetailScreen = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemDetail, setItemDetail] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  // 판매상품 정보 받아오기
  useLayoutEffect(() => {
    setIsLoading(true);
    const tradeItemId = route.params.tradeId;
    (async () => {
      const result = await fetchTradeItemDetail(tradeItemId);
      console.log('판매상품정보 ', result);
      setUserId(await AsyncStorage.getItem('userId'));
      setItemDetail(result);
    })();
    setIsLoading(false);
  }, [route.params.tradeId]);

  const handleStartChat = async () => {
    const tradeId = itemDetail.id;
    const sellerId = itemDetail.sellerInfo.id;
    const tradeState = itemDetail.tradeState;
    const userId = await AsyncStorage.getItem('userId');
    // console.log(userId);
    await enterChatRoom(tradeId).then(chatRoomNum => {
      navigation.navigate('Chat', {
        screen: 'Chatting',
        params: {
          userId: userId,
          tradeState,
          chatRoomId: chatRoomNum,
          tradeId,
        },
      });
    });
  };

  return (
    <View style={styles.wrapper}>
      {!isLoading && itemDetail && (
        <>
          <View style={styles.container}>
            <ScrollView style={{maxHeight: 400}}>
              <CustomImage
                source={
                  API_URL + 'image/gifticon-cropped?path=' + itemDetail.img
                }
                style={{width: '100%', height: 400, resizeMode: 'contain'}}
              />
            </ScrollView>

            <View style={styles.profileContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={
                    badgeArr[calculateBadge(itemDetail.sellerInfo.userScore)]
                  }
                  style={{width: 50, height: 50}}
                />
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: '10%',
                    fontWeight: 'bold',
                  }}>
                  {/* {itemDetail.name} */}
                  {itemDetail.sellerInfo.name || itemDetail.sellerInfo.email}
                </Text>
              </View>
              {/* 유저 랭크 들어갈 부분 */}

              {/* <Text
                style={{
                  fontSize: 20,
                  marginLeft: '10%',
                  fontWeight: 'bold',
                }}>
                {itemDetail.sellerInfo.userScore}점
              </Text> */}
            </View>
            <View style={styles.contentContainer}>
              <Text style={{fontSize: 20, padding: 5}}>
                {itemDetail.content}
              </Text>
            </View>
          </View>
          <View style={styles.buyContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: GlobalStyles.colors.mainPrimary,
              }}>
              {AddComma(+itemDetail.price)} 원
            </Text>
            {/* <Button style={styles.chatBtn} onPress={handleStartChat}>
              채팅하기
            </Button> */}
            {userId == itemDetail.sellerInfo.id ? (
              <Button mode="outlined">본인이 판매중인 상품입니다</Button>
            ) : (
              <Button mode="contained" onPress={handleStartChat}>
                채팅하기
              </Button>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default SellingItemDetailScreen;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',

    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: '5%',

    justifyContent: 'center',
    backgroundColor: '#fff',
    // backgroundColor: 'red',
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
    backgroundColor: GlobalStyles.colors.backgroundPrimary,

    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '5%',
  },

  // chatBtn: {
  //   backgroundColor: 'red',
  //   width: '40%',
  //   height: '60%',
  //   borderRadius: 10,
  //   color: '#fff',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});
