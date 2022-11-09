import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ChatBubble = ({ isMe, msg }) => {
  return (
    <View style={isMe ? styles.myChat : styles.oppoChat}>
      <Text>{msg.text}</Text>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  myChat: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: 'yellow',
    alignSelf: 'flex-end',
  },
  oppoChat: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
});
