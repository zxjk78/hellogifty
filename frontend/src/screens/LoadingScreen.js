import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const LoadingScreen = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={require('../assets/Logo.png')}
        style={{ width: 300, height: 300 }}
      />
      <Text style={{ fontSize: 100 }}>로딩화면입니다.</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
