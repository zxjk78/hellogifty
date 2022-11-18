import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {GlobalStyles} from '../constants/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import CustomImage from '../components/UI/CustomImage';
import {enterChatRoom, fetchTradeItemDetail} from '../api/trade';

import {API_URL} from '../api/config/http-config';
import {AddComma} from '../utils/regexp';
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
    // console.log('트레이드아이템아이디:', tradeItemId);
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
            <ScrollView style={{maxHeight: 300}}>
              <CustomImage
                source={
                  API_URL + 'image/gifticon-cropped?path=' + itemDetail.img
                }
                style={{width: '100%', height: 400, resizeMode: 'center'}}
              />
            </ScrollView>

            {/* <Image style={styles.couponImage} source={{ uri: itemDetail.img }} />   이미지 조사 필요 = 크롭에서 가져오려고 하는 것 같다. */}
            <View style={styles.profileContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomImage
                  source={
                    API_URL + 'image/gifticon-cropped?path=' + itemDetail.img
                  }
                  style={{width: 40, height: 40, resizeMode: 'center'}}
                />
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: '10%',
                    fontWeight: 'bold',
                  }}>
                  {/* {itemDetail.name} */}
                  {itemDetail.sellerInfo.email}
                </Text>
              </View>
              {/* 유저 랭크 들어갈 부분 */}
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: '10%',
                  fontWeight: 'bold',
                }}>
                {/* {itemDetail.name} */}
                {/* {itemDetail.sellerInfo.userScore}점 */}
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={{fontSize: 20, padding: 5}}>
                {itemDetail.content}
              </Text>
            </View>
          </View>
          <View style={styles.buyContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
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
    width: '90%',
    marginLeft: '5%',
    flex: 1,
  },
  container: {
    padding: 8,
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
    backgroundColor: GlobalStyles.colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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
