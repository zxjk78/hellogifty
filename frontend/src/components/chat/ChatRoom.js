import { StyleSheet, Text, View, ScrollView, Keyboard } from 'react-native';
import SockJsClient from 'react-stomp';

import React, { useState, useEffect, useRef } from 'react';

import { Button } from 'react-native-paper';
import ChatInput from './ChatInput';
import PayBubble from './PayBubble';
import TalkBubble from './TalkBubble';
import TradeBubble from './TradeBubble';
import ChatLoading from './ChatLoading';
const PORT = 9090;
// const CHATTING_SERVER_URL = `http://localhost:${PORT}/chat`;
const CHATTING_SERVER_URL = `http://k7a705.p.ssafy.io:${PORT}/chat`;
const ChatRoom = ({ chatRoomId, userId }) => {
  const $websocket = useRef(null);
  const [connected, setConnected] = useState(false);

  // 소켓 연결 주기적으로 체크
  const CHECK_SOCKET_CONNECTION_TIME = 1000;
  useEffect(() => {
    const timer = setInterval(() => {
      if ($websocket.current != null) {
        setConnected($websocket.current.state.connected);
      }
    }, CHECK_SOCKET_CONNECTION_TIME);

    return () => clearInterval(timer);
  }, []);

  // 채팅방 입장 시 동작
  useEffect(() => {
    // console.log('change connection : ' + connected);
    // 지금은 연결되면 보내지만, 처음 들어왔을 때만 처리되어야 함
    if (connected) {
      sendEnterChatRoomHandler();
    }
  }, [connected, chatRoomId]);

  /*********************
   *******  Chat  ******
   *********************/

  // 입장했을 때, sub: 수신하기 위한 소켓
  const [topics, setTopics] = useState([
    '/chat/enter',
    '/sub/chat/load/room/' + chatRoomId + '/user/' + userId,
    '/sub/chat/room/' + chatRoomId,
  ]);
  const [messageList, setMessageList] = useState([]);
  const lastMessage = useRef(null);

  // spring server로 보낼 chat data dto
  const [chatData, setChatData] = useState({
    chatRoomId: chatRoomId, // Number
    userId: userId, // Number
    text: '', // String
  });

  const messageChangeHandler = (newMessage) => {
    setChatData({ ...chatData, text: newMessage });
  };

  // 최초 입장 시 설정 초기화
  useEffect(() => {
    setMessageList([]);
    // 현재 채팅방 subscribe
    setTopics([...topics, '/sub/chat/room/' + chatRoomId]);
  }, [chatRoomId]);

  // 메시지 전송
  const sendMessageHandler = () => {
    $websocket.current.sendMessage('/chat/message', JSON.stringify(chatData));
    messageChangeHandler('');
  };
  const sendTalkMessageHandler = (chatContent) => {
    const dataDto = {
      chatRoomId: chatRoomId, // Number
      userId: userId, // Number
      text: chatContent, // String
      messageType: 'TALK', // String: 'TALK','PAY','TRADE'
    };

    $websocket.current.sendMessage('/chat/message', JSON.stringify(dataDto));
    messageChangeHandler('');

    // 낮은 부분으로 스크롤하게 하게 만드는 코드
    Keyboard.dismiss();
  };

  // 채팅방 입장 메시지 전달 (기존 채팅 내역 불러오기)
  const sendEnterChatRoomHandler = () => {
    $websocket.current.sendMessage(
      '/chat/enter',
      JSON.stringify({ chatRoomId, userId })
    );
  };

  // 새로운 메시지 수신 시 동작 (수신 메시지는 배열로 옴)
  const recieveMessageHandler = (msg) => {
    // 메시지 리스트에 추가
    setMessageList([...messageList, ...msg]);
    // 스크롤 이동 - 이부분을 react native 형식으로 바꿀 것
    lastMessage.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };
  const handleTrade = () => {
    if (userId == 1) {
      console.log('판매자 거래 완료 로직');
    } else {
      console.log('구매자 입금 완료 로직');
    }
  };
  const isMe = (chatUserId) => {
    return chatUserId === userId;
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <View style={styles.configArea}> */}
      {/* 소켓 통신 담당 컴포넌트 SockJsClient */}
      <SockJsClient
        url={CHATTING_SERVER_URL} // **채팅 URL
        topics={topics}
        onMessage={(msg) => recieveMessageHandler(msg)}
        ref={$websocket}
      />
      {/* <View style={styles.tmp}>
          <Text>{chatRoomId} 번 ChatRoom</Text>
          <Text>{userId} 번 유저와 상대방 유저가 소켓으로 통신</Text>
        </View> */}
      {!connected ? (
        <ChatLoading />
      ) : (
        <>
          <Button
            style={styles.tradeBtn}
            onPress={handleTrade}
            mode="contained"
          >
            추가메뉴 {userId == 1 ? '입금완료' : '판매하기'}
          </Button>

          <ScrollView style={styles.chatLogArea}>
            {messageList.map((msg, index) => {
              let choice;

              switch (msg.messageType) {
                case 'TRADE':
                  choice = (
                    <TradeBubble
                      isMe={+msg.userId === +userId}
                      key={index}
                      msg={msg}
                    />
                  );
                  break;
                case 'PAY':
                  choice = (
                    <PayBubble
                      isMe={+msg.userId === +userId}
                      key={index}
                      msg={msg}
                    />
                  );
                  break;

                default:
                  choice = (
                    <TalkBubble
                      isMe={+msg.userId === +userId}
                      key={index}
                      msg={msg}
                    />
                  );

                  break;
              }

              return choice;
            })}
          </ScrollView>
          <View style={styles.inputArea}>
            <ChatInput onSubmit={sendTalkMessageHandler} />
          </View>
        </>
      )}
      {/* <View style={styles.connection}>
          <Text>소켓 연결 상태</Text>
          <Text> {connected ? '🟢 연결됨' : '🔴 연결 없음'}</Text>
        </View> */}
      {/* </View> */}
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  chatLogArea: {
    height: '70%',
    width: '90%',
    marginLeft: '7%',
    marginTop: '5%',
  },
  inputArea: {
    height: '10%',
    minHeight: 70,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  tmp: {
    backgroundColor: 'aqua',
    fontSize: 25,
  },
  connection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tradeBtn: {
    position: 'absolute',
    zIndex: 10,
    borderRadius: 10,
    top: -10,
    right: 0,
  },
});
