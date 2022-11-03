import { axiosAuthInstance } from './config/apiController';

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

  try {
    const res = await axiosAuthInstance.post('mygifticon/', gifticonArr[0], {
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
