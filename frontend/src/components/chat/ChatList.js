import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import ChatListItem from './ChatListItem';
import { GlobalStyles } from '../../constants/style';

const ChatList = ({ list, isOngoing }) => {
  const renderItem = ({ item }) => <ChatListItem item={item} />;
  return (
    <View>
      <View
        style={{
          backgroundColor: GlobalStyles.colors.mainPrimary,
          padding: 6,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          {isOngoing ? '거래 중' : '거래 완료'}
        </Text>
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
