import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React from 'react';

import { gifticonDummy } from '../constants/data/dummyData';
import { TicketListItem } from '../components/ticket';
import { GlobalStyles } from '../constants/style';
// import SearchResultItem from '../components/shopping/search/SearchResultItem';

const renderItem = ({ item }) => <TicketListItem item={item} />;

const ProfileScreen = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.profileContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{
              uri: 'https://photo.coolenjoy.co.kr/data/editor/2012/c0f3b1f7c870df665e0469510699344b98619cf9.jpg',
            }}
            style={{ width: 60, height: 60, borderRadius: 40, marginRight: 10 }}
          />
          <Text style={{ fontSize: 20 }}>유저아이디</Text>
        </View>
        <View>
          <Image
            source={{
              uri: 'https://photo.coolenjoy.co.kr/data/editor/2012/c0f3b1f7c870df665e0469510699344b98619cf9.jpg',
            }}
            style={{ width: 60, height: 60 }}
          />
        </View>
      </View>
      <View style={styles.ticketBrief}>
        <Text>판매상품 {gifticonDummy.length}개</Text>
      </View>
      <View style={styles.ticketContainer}>
        <FlatList
          // 나중에 searchResultItem 형식으로 바꾸기
          data={gifticonDummy}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: GlobalStyles.colors.backgroundPrimary,
  },
  profileContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10%',
  },
  ticketBrief: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    paddingBottom: 0,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  ticketContainer: {
    flex: 10,
    // backgroundColor: 'red',
  },
});
