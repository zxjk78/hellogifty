import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react';
import { login } from '../api/auth';
const LoginScreen2 = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    (async () => {
      const accessToken = await login(id, password);
      await AsyncStorage.setItem('accessToken', accessToken);
      console.log(await AsyncStorage.getItem('accessToken'));
    })();
  };
  return (
    <View>
      <Text>아이디</Text>
      <TextInput placeholder="아이디" onChangeText={setId} />

      <Text>비밀번호</Text>
      <TextInput placeholder="비밀번호" onChangeText={setPassword} />
      <Button title="로그인" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen2;

const styles = StyleSheet.create({});
