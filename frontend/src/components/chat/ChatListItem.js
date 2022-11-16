import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { expressDateCal } from '../../utils/showDate';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatListItem = ({ item }) => {
  const navigation = useNavigation();
  // 채팅방이 존재하는 경우, id를 들고 입장
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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
          style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
        />
      </View>
      <View>
        <Text style={{ textAlign: 'right', fontSize: 12, marginBottom: 5 }}>
          {expressDateCal(item.lastChatCreatedTime)}
        </Text>
        <Text>{item.lastChatContent}</Text>
      </View>
    </Pressable>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
});
