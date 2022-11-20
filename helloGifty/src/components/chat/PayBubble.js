import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const PayBubble = ({msg, isMe}) => {
  return (
    <View style={{padding: 10}}>
      <View style={[styles.common, isMe ? styles.myChat : styles.oppoChat]}>
        <Image
          source={require('../../assets/Logo.png')}
          style={{width: 50, height: 50}}
        />
        <Text>입금하였습니다.</Text>
      </View>
    </View>
  );
};

export default PayBubble;

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
