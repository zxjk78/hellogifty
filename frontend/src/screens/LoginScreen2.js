import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { login, logout, signup } from '../api/auth';
const LoginScreen2 = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then((item) => {
      if (item) {
        console.log('토큰존재:', item);
        setIsLoggedIn(true);
      } else {
        console.log('토큰없음:', item);

        setIsLoggedIn(false);
      }
    });
  }, [isLoggedIn]);

  const handleSignup = () => {
    (async () => {
      const result = await signup(id, password);
      console.log('회원가입 완료: ', result);
    })();
  };
  const handleLogin = () => {
    (async () => {
      const { accessToken, refreshToken } = await login(id, password);
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      console.log('엑세스토큰: ', await AsyncStorage.getItem('accessToken'));
    })();
  };
  const handleLogout = () => {
    (async () => {
      await logout();
    })();
  };

  return (
    <View>
      {isLoggedIn ? (
        <>
          <Text>로그인된 상태입니다.</Text>
          <Button title="로그아웃하기" onPress={handleLogout} />
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
