import {axiosAuthInstance} from './config/apiController';
import RNFS from 'react-native-fs';
import {fetchImage} from './image';
import {API_URL} from './config/http-config';
import ImgToBase64 from 'react-native-image-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchMyGifticonList = async () => {
  try {
    const res = await axiosAuthInstance.get('mygifticon/');

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMySellingGifticonList = async () => {
  try {
    const res = await axiosAuthInstance.get('mygifticon/ontrade');
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMyGifticonDetail = async gifticonId => {
  try {
    const res = await axiosAuthInstance.get('mygifticon/' + gifticonId);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addGifticon = async gifticonArr => {
  try {
    console.log('내 기프티콘 등록');
    // 이미지 url을 이미지 file로 변환시켜야 함
    const gifticonArr2 = gifticonArr.map((gifticon, index) => {
      const {name, expirationDate, categoryId, number} = gifticon;
      // console.log(name);
      return {
        name,
        expirationDate,
        categoryId,
        number,
        // fileBase64: 'data:image/jpeg;base64,' + item.couponImg,
        fileBase64: ('data:image/jpeg;base64,' + gifticon.couponImg).replace(
          /\n/g,
          '',
        ),
      };
    });

    const enrollGifticon = item => {
      return axiosAuthInstance.post('mygifticon/', item);
    };

    Promise.all(gifticonArr2.map(gifticon => enrollGifticon(gifticon)))
      .then(() => {
        console.log('기프티콘 등록 성공');
        console.log('유저 mms 아이디 변경 시도');
        // axiosAuthInstance.put('/mmsIndex',{userMmsIndex:});
      })
      .catch(() => {
        console.log('기프티콘 등록 실패');
      });

    // const res = await axiosAuthInstance.post('mygifticon/', gifticonArr2[0]);
  } catch (error) {
    console.log(error);
  }
};

export const addGifticonFromFile = async gifticonInfo => {
  try {
    const gifticon = {
      ...gifticonInfo,
      fileBase64: ('data:image/jpeg;base64,' + gifticonInfo.fileBase64).replace(
        /\n/g,
        '',
      ),
    };
    const res = await axiosAuthInstance.post('mygifticon/', gifticon);
    return res.data.success;
  } catch (error) {
    console.log('앨범에서 쿠폰 등록 시 에러: ', error);
  }
};

const getGifticonDetail = async id => {
  try {
    const res = await axiosAuthInstance.get(`/mygifticon/${id}`);
    return res.data.data;
  } catch (error) {
    console.log('내 기프티콘디테일', error);
  }
};

const ModifiedGifticon = data => {
  console.log(data);
};

const isUsedGifticon = async id => {
  try {
    const res = await axiosAuthInstance.put(`/mygifticon/isused/${id}`);
    return res;
  } catch (error) {
    console.log(error, '사용완료 에러');
  }
};

// const sellMyGifticon = (info) => {
//   console.log(info.imagePath, '이미지 이미지')
//   RNFS.readFile(info.imagePath, 'base64')
//     .then(async (res) => {
//       const cropFileBase64 = res;
//       const data = {
//         content: info.content,
//         cropFileBase64: cropFileBase64,
//         gifticonId: info.id,
//         price: +info.price,
//         title: info.title,
//       };
//       try {
//         const res = await axiosAuthInstance.post('trade/', data);
//         console.log('판매등록 성공!!');
//         return res.data.data;
//       } catch (error) {
//         console.log(error);
//       }
//     })
//     .catch((error) => console.log(error, '여기서'));
// };
const sellMyGifticon = async info => {
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  function replaceAll(str, match, replacement) {
    return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
  }
  // console.log(info.picture, 'picture 정보야');
  try {
    if (info.picture == '') {
      // 라이브러리로 base64로 바꾸기
      ImgToBase64.getBase64String(
        API_URL + 'image/gifticon?path=' + info.noCropImg,
      )
        .then(async base64String => {
          const cropFileBase64 = replaceAll(base64String, '\n', '');
          const data = {
            content: info.content,
            cropFileBase64: 'data:image/jpeg;base64,' + cropFileBase64,
            gifticonId: info.id,
            price: +info.price,
            title: info.title,
          };
          // console.log(data, '안이야');
          const res = await axiosAuthInstance.post('trade/', data);
          // console.log('판매등록 성공!!');
          return res.data.data;
        })
        .catch(err => console.log(err, 'noCrop 실패'));
    } else {
      const data = {
        content: info.content,
        cropFileBase64: info.picture,
        gifticonId: info.id,
        price: +info.price,
        title: info.title,
      };
      // console.log(data, '밖이야');
      const res = await axiosAuthInstance.post('trade/', data);
      // console.log('판매등록 성공!!');
      return res.data.data;
    }
    // console.log(resImgB64, 'base64 이미지 이미지')
  } catch (error) {
    console.log(error, '판매등록 에러');
  }
};

const deleteMyGifticon = async id => {
  try {
    const res = await axiosAuthInstance.delete(`mygifticon/${id}`);
    return console.log('삭제 성공');
  } catch (error) {
    console.log(error, '기프티콘 삭제 에러');
  }
};

export {
  ModifiedGifticon,
  sellMyGifticon,
  getGifticonDetail,
  deleteMyGifticon,
  isUsedGifticon,
};
