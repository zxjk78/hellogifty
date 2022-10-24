import { PermissionsAndroid } from 'react-native';

// 접근 권한 얻는 함수
export const requestReadMMSPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'READ SMS',
        message: 'SMS 접근 권한',
        buttonNegative: '아니오',
        buttonPositive: '예',
      }
    );
    const granted2 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_MMS,
      {
        title: 'MMS 권한',
        message: 'MMS 접근 권한',
        buttonNegative: '아니오',
        buttonPositive: '예',
      }
    );
    const granted3 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECEIVE_WAP_PUSH,
      {
        title: 'MMS 권한 요청',
        message: 'MMS 접근 권한 요청',
        buttonNegative: '아니오',
        buttonPositive: '예',
      }
    );
    if (
      (granted && granted3 && granted2) === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('권한 부여 성공');
      return true;
    } else {
      console.log('권한 부여 실패');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};
