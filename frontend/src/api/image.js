import { axiosAuthInstance } from './config/apiController';

export const fetchImage = async (src) => {
  try {
    const res = await axiosAuthInstance.get(src);

    // console.log('이미지데이터', res.data);
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};
