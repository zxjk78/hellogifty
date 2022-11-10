// import { axiosAuthInstance } from './config/apiController';
import axios from 'axios';
import { API_URL } from './config/http-config';
// import { base64toFile } from '../utils/mmsFunc';
// mms 이미지를 보내고, 그 중에서 기프티콘 이미지, 데이터만 반환받는 함수
const sendMMSImage = async (imageStringArr) => {
  // const formdata = new FormData();
  // const imageFileArr = imageStringArr.map((item, index) =>
  //   base64toFile(item, index + '.jpg')
  // );
  // formdata.append('images', imageFileArr);
  // try {
  //   const response = await axios.post(
  //     `user/${localStorage.getItem('userId')}/nutrient?period=${period}`,
  //     formdata,
  //     {
  //       headers: {
  //         'Content-Type': 'multipart/form-data; charset=utf-8',
  //         'Access-Control-Allow-Origin': API_URL,
  //         'Access-Control-Allow-Credentials': true,
  //       },
  //     }
  //   );
  //   //기프티콘 이미지 또는 이미지는 전송시간이 오래 걸리니 해당 이미지가 들어온 번호의 배열, 유효기간, 기프티콘 이름, 브랜드명, 브랜드 이미지 필요
  //   // return response.data.data;
  // } catch (error) {
  //   console.log(error);
  // }
};

// 아래 함수의 테스트 함수
const dummySendMMSImage = async (imageStringArr) => {
  return [
    {
      idx: 1,
      brandName: 'Starbucks',
      brandImage:
        'https://mcdonough.com/wp-content/uploads/2020/09/starbucks-logo-png-transparent.png',
      name: '[스타벅스] 아메리카노 1잔',
      expirationDate: '2022-12-12',
      couponImg: imageStringArr[0],
      categoryId: 1,
    },
    {
      idx: 5,
      brandName: 'Ediya',
      brandImage:
        'https://mblogthumb-phinf.pstatic.net/20160604_62/ppanppane_1465006723421ByIAd_PNG/%C0%CC%B5%F0%BE%DF%B7%CE%B0%ED_%282%29.png?type=w800',
      name: '이디야 카페라떼 tall',
      expirationDate: '2022-12-22',
      couponImg: imageStringArr[0],
      categoryId: 3,
    },
  ];
};

export { sendMMSImage, dummySendMMSImage };
