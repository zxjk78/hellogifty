import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { GlobalStyles } from '../constants/style';
import { chatListItemDummy } from '../constants/data/dummyData';
import { ChatList } from '../components/chat';
const ChattingRoomScreen = () => {
  const [finishedConversation, setFinishedConversation] = useState([]);
  const [onGoingConversation, setOnGoingConversation] = useState([]);

  // 임시로 만들어진 더미 state들

  const chatRoomIdOptions = [128, 256, 512, 1024, 2056];

  const [userId, setUserId] = useState(1000);
  const [chatRoomId, setChatRoomId] = useState('');

  useLayoutEffect(() => {
    const finished = [];
    const onGoing = [];
    chatListItemDummy.forEach((item) => {
      if (item?.isTransactionDone) {
        finished.push(item);
      } else {
        onGoing.push(item);
      }
    });
    setFinishedConversation(finished);
    setOnGoingConversation(onGoing);
  }, [chatListItemDummy]);

  return (
    <View style={styles.wrapper}>
      <Text
        style={styles.chatStatus}
      >{`거래 중인 채팅이 ${onGoingConversation.length}건, \n거래 완료한 채팅이 ${finishedConversation.length}건 있습니다.`}</Text>

      <ChatList list={onGoingConversation} isOngoing />
      <ChatList list={finishedConversation} />
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
