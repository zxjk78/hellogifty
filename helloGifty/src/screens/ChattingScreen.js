import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {GlobalStyles} from '../constants/style';
import {chatListItemDummy} from '../constants/data/dummyData';
import {ChatList, ChatRoom} from '../components/chat';
import {useRoute} from '@react-navigation/native';

// chatRoomId, userId 들고 채팅방 입장 -> ChatRoomId로 던져주는 역할
const ChattingScreen = () => {
  const route = useRoute();
  const [chatRoomId, setChatRoomId] = useState('');

  useEffect(() => {
    setChatRoomId(route.params?.chatRoomId);
  }, [route.params?.chatRoomId]);

  return (
    <View style={{flex: 1}}>
      {chatRoomId != '' ? (
        <ChatRoom
          chatRoomId={chatRoomId}
          userId={route.params?.userId}
          tradeState={route.params?.tradeState}
          tradeId={route.params?.tradeId}
        />
      ) : (
        <Text>채팅방이 존재하지 않습니다.</Text>
      )}
    </View>
  );
};

export default ChattingScreen;

const styles = StyleSheet.create({});
