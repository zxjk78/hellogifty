import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';

const ChatInput = ({ onSubmit }) => {
  const [chatContent, setChatContent] = useState('');

  const handleChatSubmit = () => {
    onSubmit(chatContent);
    setChatContent('');
  };

  return (
    <View style={{ flexDirection: 'row', width: '100%' }}>
      <TextInput
        style={styles.textInput}
        onChangeText={setChatContent}
        multiline={true}
        value={chatContent}
      />
      <View style={{ width: '5%' }}></View>
      <Button title="전송" onPress={handleChatSubmit} />
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
});
