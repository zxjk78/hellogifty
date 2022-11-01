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

export { fetchMyGifticon };
