import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomImage from '../UI/CustomImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchTradeItemDetail} from '../../api/trade';
import {API_URL} from '../../api/config/http-config';

const ChatListItem = ({item}) => {
  const navigation = useNavigation();
  const [tradeDetail, setTradeDetail] = useState(null);
  const [opponentName, setOpponentName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // 채팅방이 존재하는 경우, id를 들고 입장
  useEffect(() => {
    (async () => {
      setIsLoading(true);

      // 판매자인지 구매자인지 비교

      const userId = await AsyncStorage.getItem('userId');

      const buyerId = item.buyer.id;
      const sellerId = item.seller.id;

      setOpponentName(() => {
        return userId == buyerId ? item.seller.name : item.buyer.name;
      });
      // 상품 정보 받아오기

      const tradeInfo = await fetchTradeItemDetail(item.tradePostInfo.id);
      setTradeDetail(tradeInfo);

      setIsLoading(false);
    })();
  }, [
    item.buyer.id,
    item.buyer.name,
    item.seller.id,
    item.seller.name,
    item.tradePostInfo.id,
  ]);

  const enterChatRoom = async () => {
    const userId = await AsyncStorage.getItem('userId');
    navigation.navigate('Chatting', {
      userId: userId,
      chatRoomId: item.chatRoomId,
      tradeState: item.tradePostInfo.tradeState,
      tradeId: item.tradePostInfo.id,
    });
  };
  return (
    <Pressable style={styles.container} onPress={enterChatRoom}>
      {!isLoading && opponentName && tradeDetail && (
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomImage
              source={
                API_URL + 'image/gifticon-cropped?path=' + tradeDetail.img
              }
            />
          </View>
          <View style={{alignItems: 'center', flexDirection: 'column'}}>
            <Text style={{textAlign: 'left', fontSize: 12, marginBottom: 5}}>
              {opponentName}님과의 대화
            </Text>
            <Text style={{textAlign: 'left', fontSize: 12, marginBottom: 5}}>
              상품명: {item.tradePostInfo.title}
            </Text>
            <Text>{item.lastChatContent}</Text>
          </View>
        </>
      )}
    </Pressable>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 8,
    alignItems: 'center',
  },
});
