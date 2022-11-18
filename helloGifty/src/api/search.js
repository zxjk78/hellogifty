import {axiosAuthInstance} from './config/apiController';
import axios from 'axios';
import {API_URL} from './config/http-config';

// const searchByKeyword = async (keyword, sort = 1, largeCategoryId = 0, smallCategoryId = 0) => {
//   const res = await axios.get(API_URL + 'search', {
//     params: { keyword: keyword, sort: sort },
//   });
// };

const searchByKeyword = async option => {
  try {
    const res = await axiosAuthInstance.get('/trade/', {
      params: {
        keyWord: option.keyWord,
        sortChoice: option.sortChoice,
        page: option.page,
        largeCategoryId: option.largeCategoryId,
        smallCategoryId: option.smallCategoryId,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log('검색 키워드 오류', error);
  }
};

export {searchByKeyword};
