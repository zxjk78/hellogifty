import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { GlobalStyles } from '../constants/style';
import { chatListItemDummy } from '../constants/data/dummyData';
import { ChatList, ChatRoom } from '../components/chat';
import { useRoute } from '@react-navigation/native';

const ChattingScreen = () => {
  const route = useRoute();
  const [chatRoomId, setChatRoomId] = useState('');

  // chatRoomId를 생성하는 코드 필요함

  useEffect(() => {
    // console.log('전달된 채팅방아이디: ', route.params?.chatRoomId);
    // console.log('전달된 유저아이디: ', route.params?.userId);
    setChatRoomId(route.params?.chatRoomId);
  }, [route.params?.chatRoomId]);

  return (
    <View style={{ flex: 1 }}>
      {chatRoomId != '' ? (
        <ChatRoom chatRoomId={chatRoomId} userId={route.params?.userId} />
      ) : (
        <Text>채팅방 존재하지 않습니다.</Text>
      )}
    </View>
  );
};

export default ChattingScreen;

const styles = StyleSheet.create({});
