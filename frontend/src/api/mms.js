import { axiosAuthInstance } from './config/apiController';
import { createGifticonArr } from '../utils/mmsGifticonFunc';
// mms 이미지 배열을 스프링 서버에 보내고, 스프링은 장고로 보내고, 그 중에서 기프티콘 이미지라고 인식된 것의 idx, 데이터만 반환받는 함수
const sendMMSImage = async (imageStringArr) => {
  try {
    const response = await axiosAuthInstance.post(
      'url 어쩌고 저쩌고',
      imageStringArr
    );
    //기프티콘 이미지 또는 이미지는 전송시간이 오래 걸리니 응답으로 받지는 말고, 해당 이미지가 들어온 번호의 배열, 유효기간, 기프티콘 이름, 브랜드명, 브랜드 이미지 필요
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 아래 함수의 테스트 함수
const dummySendMMSImage = async (imageStringArr) => {
  const response = [
    {
      id: 0,
      expirationDate: '2022-12-12',
      name: '[스타벅스] 아메리카노 1잔',
      number: '010-2888-7504',
    },
    {
      id: 1,
      expirationDate: '2000-01-12',
      name: '잘못된데이터',
      number: '010-2888-7504',
    },
    {
      id: 2,
      expirationDate: '1994-01-10',
      name: '이디야 카페라떼 tall',
      number: '010-2888-7504',
    },
  ];

  const result = createGifticonArr(response, imageStringArr);
  return result;
};

export { sendMMSImage, dummySendMMSImage };
