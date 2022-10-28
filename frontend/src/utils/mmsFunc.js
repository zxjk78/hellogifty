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

// export function base64toFile(base_data, filename) {
//   let arr = base_data.split(','),
//     mime = arr[0].match(/:(.*?);/)[1],
//     bstr = atob(arr[1]),
//     n = bstr.length,
//     u8arr = new Uint8Array(n);

//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }

//   return new File([u8arr], filename, { type: mime });
// }
export function base64toFile(base_data, filename) {
  let n = base_data.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = base_data.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: 'image/jpeg' });
}
