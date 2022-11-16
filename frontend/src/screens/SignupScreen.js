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
import { emailRegExp, passwordRegExp, phoneNumExp } from '../utils/regexp';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const handleSignup = () => {
    if (!(isEmailValid && isPwValid && isPhoneValid)) return;
    (async () => {
      const result = await signup(email, password, name, phoneNumber);
      if (result) {
        navigation.navigate('Login');
      }
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
  const handlePhoneChange = (txt) => {
    setPhoneNumber(() => txt);
    if (txt.length > 0 && phoneNumExp.test(txt)) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(false);
    }
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
            <TextInput
              placeholder="비밀번호"
              onChangeText={handlePwChange}
              secureTextEntry={true}
              style={styles.input}
            />
            <Text style={styles.regMsg}>
              {password.length > 0 &&
                !isPwValid &&
                '비밀번호는 특수문자를 포함한 영숫자 5~16자로 입력해 주세요'}
            </Text>
          </View>
          <View>
            <TextInput
              placeholder="닉네임"
              onChangeText={setName}
              style={styles.input}
            />
          </View>
        </View>
        <Text
          style={{
            marginVertical: 10,
            color: GlobalStyles.colors.mainPrimary,
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >
          안전한 거래를 위해 핸드폰 번호를 입력해 주세요.
        </Text>
        <View style={styles.form1}>
          <View>
            <TextInput
              placeholder="핸드폰 번호"
              onChangeText={handlePhoneChange}
              style={styles.input}
            />
            <Text style={styles.regMsg}>
              {password.length > 0 &&
                !isPhoneValid &&
                '핸드폰 번호를 정확히 입력해 주세요'}
            </Text>
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
  regMsg: {
    fontSize: 11,
  },
});
