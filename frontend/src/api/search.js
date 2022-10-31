// import { axiosAuthInstance } from './config/apiController';
import axios from 'axios';
import { API_URL } from './config/http-config';

const searchByKeyword = async (keyword, sort = 1) => {
  const res = await axios.get(API_URL + 'search', {
    params: { keyword: keyword, sort: sort },
  });
};

export { searchByKeyword };
