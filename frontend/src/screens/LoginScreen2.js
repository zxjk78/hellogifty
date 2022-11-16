import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import { GlobalStyles } from '../constants/style';

import { useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { login } from '../api/auth';
import { emailRegExp, passwordRegExp } from '../utils/regexp';
const LoginScreen2 = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const route = useRoute();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);

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

  const handleLogin = () => {
    if (!(isEmailValid && isPwValid)) return;

    (async () => {
      const { accessToken, refreshToken, userId, userMmsIndex } = await login(
        email,
        password
      );
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      // console.log('엑세스토큰: ', await AsyncStorage.getItem('accessToken'));

      // 유저아이디 저장
      await AsyncStorage.setItem('userId', userId + '');

      // 마지막으로 조회한 mms 이미지 id 값 넣기
      await AsyncStorage.setItem(
        'lastMMSImageIdx',
        userMmsIndex + '' || 0 + ''
      );

      navigation.replace('MainTab', { screen: 'MyCoupon' });
    })();
  };

  const handleEmailChange = (txt) => {
    setEmail(() => txt);
    if (txt.length > 0 && emailRegExp.test(txt)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };
  const handlePwChange = (txt) => {
    setPassword(() => txt);
    if (txt.length > 0 && passwordRegExp.test(txt)) {
      setIsPwValid(true);
    } else {
      setIsPwValid(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>
          <KeyboardAwareScrollView
            style={styles.wrapper}
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
          >
            {/* <View style={styles.wrapper}> */}
            <View style={styles.container}>
              <View style={styles.title}>
                <Text style={styles.title}>로그인</Text>
              </View>
              <View style={styles.form1}>
                <View>
                  {/* <Text style={styles.inputLabel}>아이디</Text> */}
                  <TextInput
                    placeholder="이메일"
                    onChangeText={handleEmailChange}
                    style={styles.input}
                  />
                  <Text style={styles.regMsg}>
                    {email.length > 0 &&
                      !isEmailValid &&
                      '정확한 이메일을 입력해 주세요'}
                  </Text>
                </View>
                <View>
                  {/* <Text style={styles.inputLabel}>비밀번호</Text> */}
                  <TextInput
                    placeholder="비밀번호"
                    onChangeText={handlePwChange}
                    style={styles.input}
                    secureTextEntry={true}
                  />
                  <Text style={styles.regMsg}>
                    {password.length > 0 &&
                      !isPwValid &&
                      '비밀번호는 특수문자를 포함한 영숫자 5~16자로 입력해 주세요'}
                  </Text>
                </View>
                <Pressable onPress={handleLogin} style={styles.btn1}>
                  <Text style={{ color: '#ffffff' }}>로그인</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Signup');
                  }}
                  style={styles.btn2}
                >
                  <Text
                    style={{
                      color: GlobalStyles.colors.mainPrimary,
                      marginTop: '10%',
                    }}
                  >
                    회원가입
                  </Text>
                </Pressable>
              </View>
            </View>
            {/* </View> */}
          </KeyboardAwareScrollView>
        </>
      )}
    </View>
  );
};

export default LoginScreen2;

const styles = StyleSheet.create({
  wrapper: {
    flex: 0.7,

    width: '80%',
    marginLeft: '10%',
    marginTop: '20%',
  },
  page: {},
  container: {
    // flex: 1,
    // backgroundColor: 'red',
    marginTop: '15%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: GlobalStyles.colors.mainPrimary,
    flex: 1,
    marginBottom: '5%',
  },
  form1: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent: 'space-around',
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
  },
  btn1: {
    marginTop: 10,
    backgroundColor: GlobalStyles.colors.mainPrimary,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  btn2: {
    marginTop: 10,

    alignItems: 'flex-end',
  },
  regMsg: {
    fontSize: 11,
  },
});
