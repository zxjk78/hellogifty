import { axiosAuthInstance } from './config/apiController';
import { base64toFile } from '../utils/mmsFunc';
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

const AddGifticon = async (gifticonArr) => {
  console.log('내 기프티콘 등록');
  // 이미지 url을 이미지 file로 변환시켜야 함
  const gifticonArr2 = gifticonArr.map((item, index) => {
    const formData = new FormData();

    formData.append('categoryId', 1);
    formData.append('name', item.name);
    formData.append('expirationDate', item.expirationDate);
    const tmpImage = base64toFile(item.couponImg, index + '.jpg');
    console.log(tmpImage);
    formData.append('img', tmpImage);

    return formData;
  });
  console.log('변형된 배열', gifticonArr2[0]);
  try {
    const res = await axiosAuthInstance.post('mygifticon/', gifticonArr2[0], {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('기프티콘 등록 응답', res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export { fetchMyGifticon, AddGifticon };
