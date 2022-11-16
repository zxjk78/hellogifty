import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const TradeBubble = ({ msg, isMe }) => {
  return (
    <View style={{ padding: 10 }}>
      <View style={[styles.common, isMe ? styles.myChat : styles.oppoChat]}>
        <Image
          source={require('../../assets/Logo.png')}
          style={{ width: 50, height: 50 }}
        />
      </View>
      <Text>거래를 완료했어요! 상대방을 평가해 주세요!!</Text>
    </View>
  );
};

export default TradeBubble;

const styles = StyleSheet.create({
  common: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginBottom: 10,
  },
  myChat: {
    backgroundColor: 'yellow',
    alignSelf: 'flex-end',
  },
  oppoChat: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
});
