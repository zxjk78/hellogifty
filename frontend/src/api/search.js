import { axiosAuthInstance } from './config/apiController';
import axios from 'axios';
import { API_URL } from './config/http-config';

// const searchByKeyword = async (keyword, sort = 1, largeCategoryId = 0, smallCategoryId = 0) => {
//   const res = await axios.get(API_URL + 'search', {
//     params: { keyword: keyword, sort: sort },
//   });
// };

const searchByKeyword = async (keword) => {
  try {
    const res = await axiosAuthInstance.get('/trade/', {
      // params: {
      //   keyWord: keyword,
      //   largeCategoryId,
      //   smallCategoryId,
      //   sortChoice: sort
      // }
      params: {
        keyWord: "",
        sortChoice: 1,
        page: 0
      }
    });
    console.log(res.data)
    return res.data.data
  } catch (error) {
    console.log(error);
  }
}

export { searchByKeyword };
