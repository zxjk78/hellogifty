import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const TradeBubble = ({ msg, isMe }) => {
  return (
    <View style={{ padding: 10 }}>
      <View style={[styles.common, isMe ? styles.myChat : styles.oppoChat]}>
        <Image source={require('../../assets/Logo.png')} />
      </View>
      <Text>거래를 완료하였습니다.</Text>
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
