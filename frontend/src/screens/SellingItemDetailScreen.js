import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React from 'react';
import { SellingItemDetail } from '../components/shopping/detail';
import { GlobalStyles } from '../constants/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const SellingItemDetailScreen = () => {
  const navigation = useNavigation();
  const handleStartChat = async () => {
    // 가짜 seller 아이디 만들고 하기
    const sellerId = 1234;
    const myId = await AsyncStorage.getItem('userId');

    navigation.navigate('Chat', { screen: 'Chatting' });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image
          style={styles.couponImage}
          source={{
            uri: 'https://photo.coolenjoy.co.kr/data/editor/2012/c0f3b1f7c870df665e0469510699344b98619cf9.jpg',
          }}
        />
        <View style={styles.profileContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{
                uri: 'https://photo.coolenjoy.co.kr/data/editor/2012/c0f3b1f7c870df665e0469510699344b98619cf9.jpg',
              }}
              style={styles.profileImg}
            />
            <Text
              style={{ fontSize: 20, marginLeft: '10%', fontWeight: 'bold' }}
            >
              유저이름
            </Text>
          </View>
          <Image
            source={{
              uri: 'https://photo.coolenjoy.co.kr/data/editor/2012/c0f3b1f7c870df665e0469510699344b98619cf9.jpg',
            }}
            style={styles.profileRank}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={{ fontSize: 20, padding: 5 }}>텍스트 들어갈 곳</Text>
        </View>
      </View>
      <View style={styles.buyContainer}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>5,000 원</Text>

        <TouchableOpacity style={styles.chatBtn} onPress={handleStartChat}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>채팅하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SellingItemDetailScreen;

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    marginLeft: '5%',
    flex: 1,
  },
  container: {
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 7,
  },
  couponImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'stretch',
    flex: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 8,

    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  profileRank: {
    width: 40,
    height: 40,
  },
  contentContainer: {
    flex: 4,
    overflow: 'scroll',
  },
  buyContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: GlobalStyles.colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  chatBtn: {
    backgroundColor: 'red',
    width: '40%',
    height: '60%',
    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
