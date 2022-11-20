import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {GlobalStyles} from '../constants/style';
import {ChatList} from '../components/chat';
import {fetchMyChatRoom} from '../api/trade';
import AsyncStorage from '@react-native-async-storage/async-storage';
// 채팅방도 ID 값이 아닌, 다른 것을 표시해주도록 하기
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
const ChattingRoomScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [finishedChatRoom, setFinishedChatRoom] = useState(null);
  const [onGoingSaleRoom, setOnGoingSaleRoom] = useState(null);
  const [onGoingBuyingRoom, setOnGoingBuyingRoom] = useState(null);

  useLayoutEffect(() => {
    const finished = [];
    const onGoingSale = [];
    const onGoingBuying = [];

    (async () => {
      setIsLoading(true);
      const res = await fetchMyChatRoom();
      const userId = await AsyncStorage.getItem('userId');
      // res map 돌면서 거래 끝났는지 아닌지, 거래중이면 내 상품인지 아닌지 판단해서 보내주기  ONSALE, EXPIRED, SOLDOUT

      res.forEach(trade => {
        if (trade.tradePostInfo.tradeState === 'ONSALE') {
          if (+userId === +trade.buyer.id) {
            onGoingBuying.push(trade);
          } else {
            onGoingSale.push(trade);
          }
        } else {
          finished.push(trade);
        }
      });
      setFinishedChatRoom(finished);
      setOnGoingSaleRoom(onGoingSale);
      setOnGoingBuyingRoom(onGoingBuying);
      setIsLoading(false);
    })();
  }, []);

  return (
    <View style={styles.wrapper}>
      {!isLoading && onGoingSaleRoom && onGoingBuyingRoom && finishedChatRoom && (
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="info-circle"
              size={30}
              style={{marginRight: 20, color: GlobalStyles.colors.mainPrimary}}
            />
            <Text style={styles.chatStatus}>{`거래 중인 채팅이 ${
              onGoingSaleRoom.length + onGoingBuyingRoom.length
            }건, \n거래 완료한 채팅이 ${
              finishedChatRoom.length
            }건 있습니다.`}</Text>
          </View>
          <ScrollView>
            {onGoingSaleRoom.length > 0 && (
              <ChatList list={onGoingSaleRoom} isSale={true} isBuying={false} />
            )}
            {onGoingBuyingRoom.length > 0 && (
              <ChatList
                list={onGoingBuyingRoom}
                isBuying={true}
                isSale={false}
              />
            )}
            {finishedChatRoom.length > 0 && (
              <ChatList list={finishedChatRoom} />
            )}
            {onGoingSaleRoom.length === 0 &&
              onGoingBuyingRoom.length === 0 &&
              finishedChatRoom.length === 0 && (
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: '30%',
                  }}>
                  <Icon2
                    name="chat-remove"
                    style={{
                      fontSize: 100,
                      color: GlobalStyles.colors.mainPrimary,
                      marginRight: 20,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#808080',
                      alignItems: 'center',
                      marginTop: '20%',
                    }}>
                    채팅방이 존재하지 않습니다
                  </Text>
                </View>
              )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default ChattingRoomScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    padding: '5%',
    backgroundColor: GlobalStyles.colors.backgroundComponent,
  },
  userProfile: {
    width: '100%',
  },
  chatStatus: {
    fontSize: 15,
  },
});
