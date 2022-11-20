import {axiosAuthInstance} from './config/apiController';
import {MMS_FILE_PATH} from '../constants/filePath';
// mms 이미지 배열을 스프링 서버에 보내고, 스프링은 장고로 보내고, 그 중에서 기프티콘 이미지라고 인식된 것의 idx, 데이터만 반환받는 함수

export const sendMMSImage = async imageStringArr => {
  console.log('원래 찾은 mms 사진 개수', imageStringArr.length);

  const imageStringArr2 = imageStringArr.map(
    str => 'data:image/jpeg;base64,' + str.replace(/\n/g, ''),
  );
  try {
    const response = await axiosAuthInstance.post('mygifticon/validation', {
      base64StringList: imageStringArr2,
    });
    //기프티콘 이미지 또는 이미지는 전송시간이 오래 걸리니 응답으로 받지는 말고, 해당 이미지가 들어온 번호의 배열, 유효기간, 기프티콘 이름, 브랜드명, 브랜드 이미지 필요
    console.log('기프티콘이라 인식한 사진 개수', response.data.data.length);
    return response.data.data;
  } catch (error) {
    console.log('mms 기프티콘 전송 에러', error);
  }
};

export const checkMMSImageValidate = async imageIdArr => {
  try {
    console.log('찾은 mms 사진 경로 id: ', imageIdArr); // content://mms/part/ + ''
    const formData = new FormData();

    // 1안
    imageIdArr.forEach(imgId => {
      formData.append('imgList[]', {
        uri: 'content://mms/part/' + imgId,
        name: imgId + '.jpg',
        type: 'image/jpeg',
      });
    });

    const res = await axiosAuthInstance.post(
      'mygifticon/validation',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res.data.data;
  } catch (error) {
    console.log('mms 기프티콘 전송 에러', error);
    return false;
  }
};
