import { axiosAuthInstance } from './config/apiController';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchMyInfo = async () => {
  try {
    const res = await axiosAuthInstance.get('user/my-info');

    // console.log('내 정보 받아오기 응답:', res.data.data);
    return res.data.data;
  } catch (error) {
    console.error('내 정보 받아오기 에러: ', error);
  }
};
export const fetchUserInfo = async (userId) => {
  try {
    const res = await axiosAuthInstance.get('user/' + userId);
    // console.log('내 정보 받아오기 응답:', res.data.data);

    return res.data.data;
  } catch (error) {
    console.error('타 유저 정보 받아오기 에러: ', error);
  }
};
