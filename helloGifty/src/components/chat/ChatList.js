import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import ChatListItem from './ChatListItem';
import {GlobalStyles} from '../../constants/style';
const ChatList = ({list, isSale, isBuying}) => {
  const renderItem = ({item}) => <ChatListItem item={item} />;
  return (
    <View>
      <View
        style={{
          backgroundColor: GlobalStyles.colors.mainPrimary,
          padding: 6,
          paddingHorizontal: 10,
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>
          {isSale ? '판매 중' : isBuying ? '구매 중' : '거래 완료'}
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

const styles = StyleSheet.create({});
