import { axiosAuthInstance } from './config/apiController';
import RNFS from 'react-native-fs';

const fetchMyGifticon = async () => {
  // console.log('내 기프티콘 목록 받기');
  try {
    const res = await axiosAuthInstance.get('mygifticon/');

    // console.log('기프티콘 목록 데이터', res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

const AddGifticon = async (gifticonArr) => {
  try {
    console.log('내 기프티콘 등록');
    // 이미지 url을 이미지 file로 변환시켜야 함
    const gifticonArr2 = gifticonArr.map((gifticon, index) => {
      const { name, expirationDate, categoryId, number } = gifticon;
      // console.log(name);
      return {
        name,
        expirationDate,
        categoryId,
        number,
        // fileBase64: 'data:image/jpeg;base64,' + item.couponImg,
        fileBase64: ('data:image/jpeg;base64,' + gifticon.couponImg).replace(
          /\n/g,
          ''
        ),
      };
    });

    const enrollGifticon = (item) => {
      return axiosAuthInstance.post('mygifticon/', item);
    };

    Promise.all(gifticonArr2.map((gifticon) => enrollGifticon(gifticon)))
      .then(() => {
        console.log('기프티콘 등록 성공');
      })
      .catch(() => {
        console.log('기프티콘 등록 실패');
      });

    // const res = await axiosAuthInstance.post('mygifticon/', gifticonArr2[0]);
  } catch (error) {
    console.log(error);
  }
};

export const AddGifticonFromFile = async (gifticonInfo) => {
  try {
    const gifticon = {
      ...gifticonInfo,
      fileBase64: ('data:image/jpeg;base64,' + gifticonInfo.fileBase64).replace(
        /\n/g,
        ''
      ),
    };
    const res = await axiosAuthInstance.post('mygifticon/', gifticon);
    return res.data.success;
  } catch (error) {
    console.log('에러발생');
  }
};

const getGifticonDetail = async (id) => {
  try {
    const res = await axiosAuthInstance.get(`/mygifticon/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

const ModifiedGifticon = (data) => {
  console.log(data);
};

const sellMyGifticon = (info) => {
  RNFS.readFile(info.imagePath, 'base64')
    .then(async (res) => {
      const cropFileBase64 = res;
      const data = {
        content: info.description,
        cropFileBase64: cropFileBase64,
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

export {
  fetchMyGifticon,
  AddGifticon,
  ModifiedGifticon,
  sellMyGifticon,
  getGifticonDetail,
};
