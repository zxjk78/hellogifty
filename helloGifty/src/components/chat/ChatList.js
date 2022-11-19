import React from 'react';
import {Text, View, FlatList} from 'react-native';
import ChatListItem from './ChatListItem';
import {GlobalStyles} from '../../constants/style';
const ChatList = ({list, isSale, isBuying}) => {
  const renderItem = ({item}) => <ChatListItem item={item} />;
  return (
    <View>
      <View
        style={[
          {
            padding: 6,
            paddingHorizontal: 10,
            marginTop: 20,
          },
          isSale
            ? {backgroundColor: 'red'}
            : isBuying
            ? {backgroundColor: 'blue'}
            : {backgroundColor: 'green'},
        ]}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>
          {isSale
            ? '판매 중인 상품'
            : isBuying
            ? '구매 중인 상품'
            : '거래 완료한 상품'}
        </Text>
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.chatRoomId}
      />
    </View>
  );
};

export default ChatList;

// const styles = StyleSheet.create({});
