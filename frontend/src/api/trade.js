import { API_URL } from './config/http-config';
import { axiosAuthInstance } from './config/apiController';

// 거래글 id 이용해서 챗룸의 정보를 (없으면 생성해서) 가져오는 api
export const enterChatRoom = async (tradeId) => {
  try {
    const res = await axiosAuthInstance.get('chatroom/trade/' + tradeId);

    // console.log('채팅신청응답: ', res.data);
    return res.data;
  } catch (error) {
    console.log('채팅방 입장', error);
  }
};

// export const fetchChatRoomList = async (userId = 6) => {
//   try {
//     const res = await axiosAuthInstance.get('chatroom/' + userId + '/users');
//     return res.data;
//   } catch (error) {
//     console.log('이 유저의 모든 대화방 받아오기', error);
//   }
// };

export const fetchTradeItemDetail = async (tradeId) => {
  try {
    const res = await axiosAuthInstance.get('trade/' + tradeId);

    console.log('응답데이터', res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
