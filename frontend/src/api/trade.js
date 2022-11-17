import { API_URL } from './config/http-config';
import { axiosAuthInstance } from './config/apiController';

//---------------------- 채팅 관련 API

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

export const fetchChatRoomUsers = async (chatroomId) => {
  try {
    const res = await axiosAuthInstance.get(
      'chatroom/' + chatroomId + '/users'
    );

    // console.log('채팅방 유저 fetch ', res.data.data);
    return res.data.data;
  } catch (error) {
    console.log('채팅방에서 판매 구매자 아이디 받아오기', error);
  }
};

export const completeTrade = async (chatroomId) => {
  try {
    const res = await axiosAuthInstance.post(
      'chatroom/' + chatroomId + '/done'
    );
    // console.log(res.data);
    return res.data.success;
  } catch (error) {
    console.log('거래 완료하기', error);
  }
};
export const fetchMyChatRoom = async () => {
  try {
    const res = await axiosAuthInstance.get('chatroom/my');
    // console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log('내 참여 채팅방 조회', error);
  }
};

//-------------------- 거래 게시글 관련 API

export const fetchTradeItemDetail = async (tradeId) => {
  try {
    const res = await axiosAuthInstance.get('trade/' + tradeId);

    console.log('거래정보 요청 응답데이터', res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

//-------------------- 평가, 신고

export const submitUserEvaluation = async (tradeId, oppoId, score) => {
  try {
    const res = await axiosAuthInstance.post(
      'trade/' + tradeId + '/evaluation/user/' + oppoId,
      { score }
    );

    console.log('평가 요청 응답데이터', res.data);

    return res.data.success;
  } catch (error) {
    console.log(error);
  }
};
export const submitUserReport = async (tradeId, oppoId, content, reason) => {
  try {
    const res = await axiosAuthInstance.post(
      'trade/' + tradeId + '/report/user/' + oppoId,
      { content, reason }
    );

    // console.log('신고 요청 응답데이터', res.data);

    return res.data.success;
  } catch (error) {
    console.log(error);
  }
};
