import { axiosAuthInstance } from './config/apiController';
import { encode } from 'url-safe-base64';
import { base64toFile, b64toFile2 } from '../utils/mmsFunc';
import axios from 'axios';
const fetchMyGifticon = async () => {
  console.log('내 기프티콘 목록 받기');
  try {
    const res = await axiosAuthInstance.get('mygifticon/');

    console.log(
      'DB에 등록된 기프티콘 목록 데이터 개수: ',
      res.data.data.length
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

const AddGifticon = async (gifticonArr) => {
  try {
    console.log('내 기프티콘 등록');
    // 이미지 url을 이미지 file로 변환시켜야 함
    const gifticonArr2 = gifticonArr.map((item, index) => {
      return {
        ...item,
        // fileBase64: 'data:image/jpeg;base64,' + item.couponImg,
        fileBase64: ('data:image/jpeg;base64,' + item.couponImg).replace(
          /\n/g,
          ''
        ),
      };
    });

    const enrollGifticon = (item) => {
      return axiosAuthInstance.post('mygifticon/', item);
    };

    Promise.all(gifticonArr2.map((item) => enrollGifticon(item)))
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

export { fetchMyGifticon, AddGifticon };
