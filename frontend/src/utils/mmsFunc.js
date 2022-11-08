import { NativeModules } from 'react-native';
import { Buffer } from 'buffer';

// 이미지 코드 받아오는 함수

export async function convertImageUri(imgId = 2404) {
  const mmsModule = NativeModules.MMSReadModule;

  try {
    let uriString;
    // mms attachment의 id값, 압축률 60, 리턴값으로 오는 base64 byte array를 callback 함수 안에서 return시킴
    await mmsModule.getMMSImagePublic('' + imgId, 20, (byteArray) => {
      // console.log('byteArray: ', byteArray);
      uriString = `data:image/jpeg;base64,${byteArray}`;
    });
    return uriString;
  } catch (error) {
    console.log(error);
  }
}

// 해당 모듈 자바 코드 분석해서, 접속했을 때 이후의 MMS 이미지 기록을 검토하고, base64 bytecode를 json에 넣어서 반환하는 함수

export async function getAllMMSAfterAccess(id = 1000, callback) {
  const mmsModule = NativeModules.MMSReadModule;
  try {
    let results;
    await mmsModule.getMMSImageArr(id + '', (b64StringArr) => {
      const parsed = JSON.parse(b64StringArr);
      results = parsed.map((item) => item.byteArray);
      callback(results);
    });
  } catch (error) {
    console.log(error);
  }
}
