import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';

import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { login, logout, signup } from '../api/auth';
const LoginScreen2 = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const route = useRoute();
  useEffect(() => {
    AsyncStorage.getItem('accessToken').then((item) => {
      if (item) {
        // console.log('토큰존재:', item);
        setIsLoggedIn(true);
        navigation.replace('MainTab', { screen: 'MyCoupon' });
      } else {
        // console.log('토큰없음:', item);

        setIsLoggedIn(false);
      }
    });
    // }, [route.params?.message]);
  }, []);

  const handleSignup = () => {
    (async () => {
      const result = await signup(id, password);
      // console.log('회원가입 완료: ', result);
    })();
  };
  const handleLogin = () => {
    (async () => {
      const { accessToken, refreshToken } = await login(id, password);
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      // console.log('엑세스토큰: ', await AsyncStorage.getItem('accessToken'));

      // 채팅 위해 유저아이디 하나 넣기
      const userId = (Math.random() * 100).toFixed(0);
      await AsyncStorage.setItem('userId', userId);

      navigation.replace('MainTab', { screen: 'MyCoupon' });
    })();
  };

  return (
    <View>
      {isLoggedIn ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'blue' }}>
            로그인
          </Text>

          <Text>아이디</Text>
          <TextInput placeholder="아이디" onChangeText={setId} />

          <Text>비밀번호</Text>
          <TextInput placeholder="비밀번호" onChangeText={setPassword} />
          <Button title="로그인" onPress={handleLogin} />
          <View style={{ height: '20%' }}></View>

          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'blue' }}>
            회원가입
          </Text>
          <Text>아이디</Text>
          <TextInput placeholder="아이디" onChangeText={setId} />

          <Text>비밀번호</Text>
          <TextInput placeholder="비밀번호" onChangeText={setPassword} />
          <Button title="회원가입" onPress={handleSignup} />
        </>
      )}
    </View>
  );
};

export default LoginScreen2;

const styles = StyleSheet.create({});
