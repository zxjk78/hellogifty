import {NativeModules} from 'react-native';

// 이미지 코드 받아오는 함수

export async function convertImageUri(imgId) {
  const mmsModule = NativeModules.MMSReadModule;

  try {
    let uriString;
    // mms attachment의 id값, 압축률 60, 리턴값으로 오는 base64 byte array를 callback 함수 안에서 return시킴
    await mmsModule.getMMSImagePublic('' + imgId, 20, byteArray => {
      // console.log('byteArray: ', byteArray);
      uriString = `data:image/jpeg;base64,${byteArray}`;
    });
    return uriString;
  } catch (error) {
    console.log(error);
  }
}

// 해당 모듈 자바 코드 분석해서, 접속했을 때 이후의 MMS 이미지 기록을 검토하고, base64 bytecode를 json에 넣어서 반환하는 함수

export async function getAllMMSAfterAccess(id = 0, callback) {
  const mmsModule = NativeModules.MMSReadModule;
  // console.log(NativeModules);
  try {
    let results;
    // mmsId의 경우 오직 여기서만 건내줄 수 있어서, 여기를 뒤져야 한다.
    await mmsModule.getMMSImageArr(id + '', b64StringArr => {
      const parsed = JSON.parse(b64StringArr);
      results = parsed.map(item => item.byteArray);
      callback(results);
    });
  } catch (error) {
    console.log(error);
  }
}

export function createGifticonArr(resArr, imgArr) {
  const result = [];
  // console.log('이미지들', imgArr.length);
  resArr.forEach(res => {
    const gifticonInfo = {
      ...res,
      couponImg: imgArr[res.id],
      categoryId: null, // 작은 카테고리를 이렇게 저장
      largeCategoryId: null,
    };
    result.push(gifticonInfo);
  });

  return result;
}
