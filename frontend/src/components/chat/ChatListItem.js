import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const ChatListItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
          style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }}
        />
        <Text>{item.oppernentName}</Text>
      </View>
      <View>
        <Text style={{ textAlign: 'right', fontSize: 12, marginBottom: 5 }}>
          {item.lastChatCreatedTime}
        </Text>
        <Text>{item.lastChatContent}</Text>
      </View>
    </View>
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
