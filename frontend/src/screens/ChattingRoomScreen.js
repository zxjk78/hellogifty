import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { GlobalStyles } from '../constants/style';
import { ChatList } from '../components/chat';
import { fetchMyChatRoom } from '../api/trade';
// 채팅방도 ID 값이 아닌, 다른 것을 표시해주도록 하기

const ChattingRoomScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [finishedChatRoom, setFinishedChatRoom] = useState(null);
  const [onGoingChatRoom, setOnGoingChatRoom] = useState(null);

  useLayoutEffect(() => {
    const finished = [];
    const onGoing = [];

    (async () => {
      const res = await fetchMyChatRoom();
      // res map 돌면서 거래 끝났는지 아닌지 판단해서 보내주기  ONSALE, EXPIRED, SOLDOUT
      res.forEach((trade) => {
        if (trade.tradePostInfo.tradeState === 'ONSALE') {
          onGoing.push(trade);
        } else {
          finished.push(trade);
        }
      });
      setFinishedChatRoom(finished);
      setOnGoingChatRoom(onGoing);
    })();
  }, []);

  return (
    <View style={styles.wrapper}>
      {!isLoading && onGoingChatRoom && finishedChatRoom && (
        <>
          <Text
            style={styles.chatStatus}
          >{`거래 중인 채팅이 ${onGoingChatRoom.length}건, \n거래 완료한 채팅이 ${finishedChatRoom.length}건 있습니다.`}</Text>

          <ChatList list={onGoingChatRoom} isOngoing />
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
