import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const ChatLoading = ({oppoId, tradeId}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../assets/Logo.png')}
        style={{width: 300, height: 300, marginTop: '10%'}}
      />
      <Text>ChatLoading</Text>
      <Text>채팅방에 입장 중입니다.</Text>
    </View>
  );
};

export default ChatLoading;

const styles = StyleSheet.create({});
