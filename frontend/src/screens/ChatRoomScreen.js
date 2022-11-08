import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { GlobalStyles } from '../constants/style';
import { chatListItemDummy } from '../constants/data/dummyData';
import { ChatList } from '../components/chat';
const ChatRoomScreen = () => {
  const [finishedConversation, setFinishedConversation] = useState([]);
  const [onGoingConversation, setOnGoingConversation] = useState([]);
  useLayoutEffect(() => {
    const finished = [];
    const onGoing = [];
    chatListItemDummy.forEach((item) => {
      if (item.isTransactionDone) {
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

export default ChatRoomScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: GlobalStyles.colors.backgroundComponent,
  },
  chatStatus: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
