import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
const ChatInput = ({ onSubmit }) => {
  const [chatContent, setChatContent] = useState('');

  const handleChatSubmit = () => {
    if (chatContent.length === 0) return;
    onSubmit(chatContent);
    setChatContent('');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextInput
        style={styles.textInput}
        onChangeText={setChatContent}
        multiline={true}
        value={chatContent}
      />
      <View style={{ width: '2%' }}></View>
      <Button onPress={handleChatSubmit} mode="contained" style={styles.btn}>
        전송
      </Button>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  textInput: {
    width: '80%',
    borderRadius: 20,
    backgroundColor: 'white',

    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  btn: {
    borderRadius: 10,
    paddingVertical: 5,
    // width: 100,
  },
});
