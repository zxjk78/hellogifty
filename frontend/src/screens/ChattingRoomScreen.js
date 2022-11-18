import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { GlobalStyles } from '../constants/style';
import { ChatList } from '../components/chat';
import { fetchMyChatRoom } from '../api/trade';
import AsyncStorage from '@react-native-async-storage/async-storage';
// 채팅방도 ID 값이 아닌, 다른 것을 표시해주도록 하기

const ChattingRoomScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [finishedChatRoom, setFinishedChatRoom] = useState(null);
  const [onGoingSaleRoom, setOnGoingSaleRoom] = useState(null);
  const [onGoingBuyingRoom, setOnGoingBuyingRoom] = useState(null);

  useLayoutEffect(() => {
    const finished = [];
    const onGoingSale = [];
    const onGoingBuying = [];

    (async () => {
      setIsLoading(true);
      const res = await fetchMyChatRoom();
      const userId = await AsyncStorage.getItem('userId');
      // res map 돌면서 거래 끝났는지 아닌지, 거래중이면 내 상품인지 아닌지 판단해서 보내주기  ONSALE, EXPIRED, SOLDOUT
      res.forEach((trade) => {
        if (trade.tradePostInfo.tradeState === 'ONSALE') {
          if (userId === trade.buyer.id) {
            onGoingBuying.push(trade);
          } else {
            onGoingSale.push(trade);
          }
        } else {
          finished.push(trade);
        }
      });
      setFinishedChatRoom(finished);
      setOnGoingSaleRoom(onGoingSale);
      setOnGoingBuyingRoom(onGoingBuying);
      setIsLoading(false);
    })();
  }, []);

  return (
    <View style={styles.wrapper}>
      {!isLoading && onGoingSaleRoom && onGoingBuyingRoom && finishedChatRoom && (
        <>
          <Text style={styles.chatStatus}>{`거래 중인 채팅이 ${
            onGoingSaleRoom.length + onGoingBuyingRoom.length
          }건, \n거래 완료한 채팅이 ${
            finishedChatRoom.length
          }건 있습니다.`}</Text>

          <ChatList list={onGoingSaleRoom} isSale />
          <ChatList list={onGoingBuyingRoom} isBuying />
          <ChatList list={finishedChatRoom} />
        </>
      )}
    </View>
  );
};

export default ChattingRoomScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: GlobalStyles.colors.backgroundComponent,
  },
  userProfile: {
    width: '100%',
  },
  chatStatus: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
