import { StyleSheet, Text, View } from 'react-native';
import SockJsClient from 'react-stomp';

import React, { useState, useEffect, useRef } from 'react';

import ChatInput from './ChatInput';
import PayBubble from './PayBubble';
import TalkBubble from './TalkBubble';
import TradeBubble from './TradeBubble';

const PORT = 9090;
// const CHATTING_SERVER_URL = `http://localhost:${PORT}/chat`;
const CHATTING_SERVER_URL = `http://k7a705.p.ssafy.io:${PORT}/chat`;
const ChatRoom = ({ chatRoomId, userId }) => {
  const $websocket = useRef(null);
  const [connected, setConnected] = useState(false);

  // 소켓 연결 주기적으로 체크
  const CHECK_SOCKET_CONNECTION_TIME = 2000;
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
  const sendMessageHandler2 = (chatContent) => {
    const dataDto = {
      chatRoomId: chatRoomId, // Number
      userId: userId, // Number
      text: chatContent, // String
      messageType: 'CHAT', // String: 'CHAT','PAY','TRADE'
    };

    $websocket.current.sendMessage('/chat/message', JSON.stringify(dataDto));
    messageChangeHandler('');
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
    // 스크롤 이동
    lastMessage.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  const isMe = (chatUserId) => {
    return chatUserId === userId;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.configArea}>
        <View style={styles.tmp}>
          <Text>{chatRoomId} 번 ChatRoom</Text>
          <Text>{userId} 번 유저와 상대방 유저가 소켓으로 통신</Text>
        </View>
        {/* 소켓 통신 담당 컴포넌트 SockJsClient */}
        <SockJsClient
          url={CHATTING_SERVER_URL} // **채팅 URL
          topics={topics}
          onMessage={(msg) => recieveMessageHandler(msg)}
          ref={$websocket}
        />

        <View style={styles.connection}>
          <Text>소켓 연결 상태</Text>
          <Text> {connected ? '🟢 연결됨' : '🔴 연결 없음'}</Text>
        </View>
      </View>

      <View style={styles.chatLogArea}>
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
      </View>
      <View style={styles.inputArea}>
        <ChatInput onSubmit={sendMessageHandler2} />
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  configArea: { flex: 1 },
  chatLogArea: { flex: 3, width: '90%', marginLeft: '5%' },
  inputArea: { flex: 1, alignItems: 'flex-start' },
  tmp: {
    backgroundColor: 'aqua',
    fontSize: 25,
  },
  connection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
