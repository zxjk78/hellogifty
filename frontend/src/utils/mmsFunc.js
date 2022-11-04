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

// 해당 모듈 자바 코드 분석해서, 접속했을 때 이후의 MMS 이미지 기록을 검토하고, base64 bytecode를 json에 넣어서 반환하는 함수

export async function getAllMMSAfterAccess(id = 1000, callback) {
  const mmsModule = NativeModules.MMSReadModule;
  try {
    let results;
    await mmsModule.getMMSImageArr(id + '', (b64StringArr) => {
      const parsed = JSON.parse(b64StringArr);
      console.log('찾은 이미지: ',parsed.length);
      results = parsed.map((item) => item.byteArray);
      callback(results);
    });
  } catch (error) {
    console.log(error);
  }
}

// export function base64toFile(base_data, filename) {
//   let n = base_data.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = base_data.charCodeAt(n);
//   }
//   return new File([u8arr], filename, { type: 'image/jpeg' });
// }

// base64 -> arraybuffer -> blob -> file 되는지
export function base64toFile(base64String, contentType = '', filename) {
  // const decodeString = new Buffer.from(base64String, 'base64');
  const arraybuffer = new ArrayBuffer(base64String.length);
  const view = new Uint8Array(arraybuffer);
  for (let i = 0; i < base64String.length; i++) {
    view[i] = base64String.charCodeAt(i) & 0xff;
    // charCodeAt() 메서드는 주어진 인덱스에 대한 UTF-16 코드를 나타내는 0부터 65535 사이의 정수를 반환
    // 비트연산자 & 와 0xff(255) 값은 숫자를 양수로 표현하기 위한 설정
  }
  const blob = new Blob([arraybuffer], { type: contentType });

  const file = new File([blob], filename, { type: 'image/jpeg' });

  console.log('변환된 파일을 출력합니다. :   ', file);
}
