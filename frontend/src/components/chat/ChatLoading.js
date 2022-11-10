import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const ChatLoading = ({ oppoId, tradeId }) => {
  return (
    <View>
      <Image
        source={require('../../assets/Logo.png')}
        style={{ width: 100, height: 100 }}
      />
      <Text>ChatLoading</Text>
      <Text>채팅방에 입장 중입니다.</Text>
    </View>
  );
};

export default ChatLoading;

const styles = StyleSheet.create({});
