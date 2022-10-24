import { NativeModules } from 'react-native';
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

// 작성중인 코드 - 미완
// 프론트에서 가장 최근의 mms id db에 다시 집어넣어야 함
// 해당 모듈 자바 코드 분석해서, 접속했을 때 이후의 MMS 이미지 기록을 검토하고, base64 bytecode를 json에 넣어서 반환하고, 이미지 들만 추려서 긁어오는 함수 만들기 - 작성중

export function getAllMMSAfterAccess(id) {
  const mmsModule = NativeModules.MMSReadModule;

  const results = [];

  try {
    return results;
  } catch (error) {
    console.log(error);
  }
}
