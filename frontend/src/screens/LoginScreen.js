import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React from 'react';

const handleOAuthLogin = () => {
  console.log('카카오 로그인 시도');
};

const LoginScreen = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <Image source={require('../assets/main.webp')} />
      <Button title="임시 로그인" onPress={handleOAuthLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
