import { axiosAuthInstance } from './config/apiController';
import axios from 'axios';
import { API_URL } from './config/http-config';

// const searchByKeyword = async (keyword, sort = 1, largeCategoryId = 0, smallCategoryId = 0) => {
//   const res = await axios.get(API_URL + 'search', {
//     params: { keyword: keyword, sort: sort },
//   });
// };

const searchByKeyword = async (keyword, sort = 1, largeCategoryId = 1, smallCategoryId = 1) => {
  try {
    const res = await axiosAuthInstance.get('/trade/', {
      params: {
        kewWord: keyword,
        largeCategoryId,
        smallCategoryId,
        sortChoice: sort
      }
    });
    return res.data.data
  } catch (error) {
    console.log(error);
  }
}

export { searchByKeyword };
