import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { GlobalStyles } from '../constants/style';
import { chatListItemDummy } from '../constants/data/dummyData';
import { ChatList, ChatRoom } from '../components/chat';
import { useRoute } from '@react-navigation/native';

// chatRoomId, userId 들고 채팅방 입장 -> ChatRoomId로 던져주는 역할
const ChattingScreen = () => {
  const route = useRoute();
  const [chatRoomId, setChatRoomId] = useState('');

  useEffect(() => {
    // console.log('전달된 채팅방아이디: ', route.params?.chatRoomId);
    // console.log('전달된 유저아이디: ', route.params?.userId);

    // 챗룸일때 tradeState가 무조건 전달되니까, 이거를 계속 안으로 끌고 들어가서 채팅방 자체에서 표시해주기

    setChatRoomId(route.params?.chatRoomId);
  }, [route.params?.chatRoomId]);

  return (
    <View style={{ flex: 1 }}>
      {chatRoomId != '' ? (
        <ChatRoom chatRoomId={chatRoomId} userId={route.params?.userId} />
      ) : (
        <Text>채팅방이 존재하지 않습니다.</Text>
      )}
    </View>
  );
};

export default ChattingScreen;

const styles = StyleSheet.create({});
