import { API_URL } from './config/http-config';
import { axiosAuthInstance } from './config/apiController';

export const enterChatRoom = async (tradeId) => {
  try {
    const res = await axiosAuthInstance.get('chatroom/trade/' + tradeId);

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
