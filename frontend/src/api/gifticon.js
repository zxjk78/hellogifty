import { axiosAuthInstance } from './config/apiController';
import { base64toFile, b64toFile2 } from '../utils/mmsFunc';
// import RNFS from 'react-native-fs';
import RNFS from 'react-native-fs';

const fetchMyGifticon = async () => {
  console.log('내 기프티콘 목록 받기');
  try {
    const res = await axiosAuthInstance.get('mygifticon/');

    console.log('기프티콘 목록 데이터', res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

const addGifticon = async (gifticonArr) => {
  console.log('내 기프티콘 등록');

  //

  // 이미지 url을 이미지 file로 변환시켜야 함
  const gifticonArr2 = gifticonArr.map((item, index) => {
    const formData = new FormData();

    formData.append('categoryId', 1);
    formData.append('name', item.name);
    formData.append('expirationDate', item.expirationDate);

    // base64를 file로 변환
    const file = b64toFile2(item.couponImg);
    formData.append('img', file);
    // base64toFile(item.couponImg, index + '.jpg');
    // console.log(tmpImage);
    // formData.append('img', tmpImage);

    return formData;
  });
  // console.log('변형된 배열', gifticonArr2[0]);
  const res = await axiosAuthInstance.post('mygifticon/', gifticonArr2[0], {
    headers: 'multipart/form-data',
  });
};

const sellMyGifticon = (info) => {
  RNFS.readFile(info.imagePath, 'base64')
    .then(async (res) => {
      const cropFileBase64 = res;
      // console.log(cropFileBase64.split(',')[0]);
      const data = {
        content: info.description,
        cropFileBase64: 'data:image/jpeg;base64,' + cropFileBase64,
        gifticonId: info.item.id,
        price: +info.price,
        title: info.title,
      };
      try {
        const res = await axiosAuthInstance.post('trade/', data);
        console.log('판매등록 성공!!');
        return res.data.data;
      } catch (error) {
        console.log(error);
      }
    })
    .catch((error) => console.log(error, '여기서'));
};

export { fetchMyGifticon, addGifticon, sellMyGifticon };
