import { axiosAuthInstance } from './config/apiController';

export const fetchBrandImage = async (imgPath) => {
  // console.log('내 기프티콘 목록 받기');
  try {
    const res = await axiosAuthInstance.get('image/brand', {
      params: {
        path: imgPath,
      },
    });

    console.log('이미지데이터', res.data);
    // return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
