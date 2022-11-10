import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { GlobalStyles } from '../constants/style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signup } from '../api/auth';

const SignupScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleSignup = () => {
    (async () => {
      const result = await signup(id, password);
      if (result) {
        navigation.navigate('Login');
      }
    })();
  };

  return (
    <KeyboardAwareScrollView
      style={styles.wrapper}
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.title}>회원가입</Text>
        </View>

        <View style={styles.form1}>
          <View>
            {/* <Text style={styles.inputLabel}>아이디</Text> */}
            <TextInput
              placeholder="아이디"
              onChangeText={setId}
              style={styles.input}
            />
          </View>
          <View>
            {/* <Text style={styles.inputLabel}>비밀번호</Text> */}
            <TextInput
              placeholder="비밀번호"
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>
        </View>
        <Text style={{ marginVertical: 10 }}>
          안전한 거래를 위해 개인정보를 입력해 주세요.
        </Text>
        <View style={styles.form1}>
          <View>
            {/* <Text style={styles.inputLabel}>이름</Text> */}
            <TextInput
              placeholder="이름"
              onChangeText={setName}
              style={styles.input}
            />
          </View>
          <View>
            {/* <Text style={styles.inputLabel}>전화번호</Text> */}
            <TextInput
              placeholder="전화번호"
              onChangeText={setPhoneNumber}
              style={styles.input}
            />
          </View>
        </View>
        <Pressable onPress={handleSignup} style={styles.btn1}>
          <Text style={{ color: '#ffffff' }}>회원가입</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={styles.btn2}
        >
          <Text style={{ color: GlobalStyles.colors.mainPrimary }}>로그인</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 0.7,
    // justifyContent: 'center',

    width: '80%',
    marginLeft: '10%',
    marginTop: '20%',
  },
  container: {
    // flex: 1,
    // backgroundColor: 'red',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: GlobalStyles.colors.mainPrimary,
    flex: 1,
  },
  form1: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // justifyContent: 'space-around',
    flex: 2,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.mainPrimary,
    marginBottom: 10,
    paddingBottom: 0,
  },
  btn1: {
    marginTop: 10,
    backgroundColor: GlobalStyles.colors.mainPrimary,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  btn2: {
    marginTop: 25,

    alignItems: 'flex-end',
  },
});
