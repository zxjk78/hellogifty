import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const ChatLoading = ({oppoId, tradeId}) => {
  return (
    <View style={{backgroundColor: '#fff', height: '100%'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/Logo.png')}
          style={{width: 300, height: 300, marginTop: '10%'}}
        />
        <Text
          style={{
            color: '#1c1c1c',
            fontSize: 20,
            textAlign: 'center',
            marginTop: '15%',
          }}>
          채팅방에 입장 중입니다{'\n'}잠시만 기다려 주세요
        </Text>
      </View>
    </View>
  );
};

export default ChatLoading;

const styles = StyleSheet.create({});
