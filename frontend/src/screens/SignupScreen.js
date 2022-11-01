import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SignupScreen = () => {
  return (
    <View>
      <Text>회원가입</Text>
      <View>
        <Text>아이디</Text>
        <TextInput placeholder="아이디" onChangeText={setId} />

        <Text>비밀번호</Text>
        <TextInput placeholder="비밀번호" onChangeText={setPassword} />
        <Button title="로그인" onPress={handleSignup} />
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});
