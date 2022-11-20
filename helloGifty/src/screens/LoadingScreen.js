import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {GlobalStyles} from '../constants/style';

const LoadingScreen = () => {
  return (
    <View style={{alignItems: 'center', backgroundColor: '#fff', flex: 1}}>
      <Image
        source={require('../assets/Logo.png')}
        style={{width: 300, height: 300, marginTop: 50}}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: GlobalStyles.colors.mainPrimary,
          marginTop: 100,
        }}>
        잠시만 기다려 주세요..
      </Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
