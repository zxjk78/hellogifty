import {axiosCommonInstance, axiosAuthInstance} from './config/apiController';
import AsyncStorage from '@react-native-async-storage/async-storage';
const login = async (email, password) => {
  try {
    const res = await axiosCommonInstance.post('login', {email, password});
    const {accessToken, refreshToken, userId, userMmsIndex} = res.data.data;

    return {accessToken, refreshToken, userId, userMmsIndex};
  } catch (error) {
    console.error('로그인 에러: ', error);
  }
};

const signup = async (email, password, name, phoneNumber) => {
  console.log('회원가입: ', email, password, name, phoneNumber);
  try {
    const res = await axiosCommonInstance.post('signup', {
      email,
      password,
      name,
      phoneNumber,
    });

    return res.data.success;
  } catch (error) {
    console.error('회원가입 에러: ', error);
  }
};

const logout = async () => {
  try {
    const res = await axiosAuthInstance.delete('log-out');

    return res.data.success;
  } catch (error) {
    console.error('로그아웃 에러: ', error);
  } finally {
    await AsyncStorage.clear();
  }
};

export {login, signup, logout};
