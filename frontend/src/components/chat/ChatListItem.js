import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatListItem = ({ item }) => {
  // 채팅방이 존재하는 경우, id를 들고 입장시키는 태그
  const navigation = useNavigation();
  const enterChatRoom = async () => {
    const userId = await AsyncStorage.getItem('userId');
    // const userId =  AsyncStorage.getItem('userId').then(() => {
    //   navigation.navigate('Chatting', { userId: userId, chatRoomId: item.id });
    // });
    navigation.navigate('Chatting', { userId: userId, chatRoomId: item.id });
  };
  return (
    <Pressable style={styles.container} onPress={enterChatRoom}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
          style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
        />
        <Text>채팅방 id: {item.id}</Text>
      </View>
      <View>
        <Text style={{ textAlign: 'right', fontSize: 12, marginBottom: 5 }}>
          {item.lastChatCreatedTime}
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
