import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {GlobalStyles} from '../../constants/style';

const TradeBubble = ({msg, isSeller, openModal}) => {
  return (
    <View style={{padding: 10}}>
      <View style={[styles.common, styles.doneChat]}>
        <Image
          source={require('../../assets/Logo.png')}
          style={{
            width: 50,
            height: 50,
            alignSelf: 'center',
            marginVertical: 20,
          }}
        />
        <Text style={{textAlign: 'center'}}>{`${
          !isSeller ? '판매자가 쿠폰을 건내주었어요!' : '거래를 완료했어요!'
        } \n${!isSeller ? '판매자' : '구매자'}를 평가해 주세요!!`}</Text>
        <Button onPress={openModal}> 평가하기</Button>
      </View>
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
  sellerChat: {
    backgroundColor: 'yellow',
    alignSelf: 'flex-end',
  },
  buyerChat: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  doneChat: {
    backgroundColor: GlobalStyles.colors.backgroundPrimary,
    width: '80%',
    alignSelf: 'center',
  },
});
