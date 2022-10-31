import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { SellingItemDetail } from '../components/shopping/detail';
const SellingItemDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.couponImage}
        source={{
          uri: 'https://photo.coolenjoy.co.kr/data/editor/2012/c0f3b1f7c870df665e0469510699344b98619cf9.jpg',
        }}
      />
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://photo.coolenjoy.co.kr/data/editor/2012/c0f3b1f7c870df665e0469510699344b98619cf9.jpg',
          }}
          style={styles.profileImg}
        />
        <Text style={{ fontSize: 20 }}>유저이름</Text>
        <Image
          source={{
            uri: 'https://photo.coolenjoy.co.kr/data/editor/2012/c0f3b1f7c870df665e0469510699344b98619cf9.jpg',
          }}
          style={styles.profileRank}
        />
      </View>
    </View>
  );
};

export default SellingItemDetailScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  couponImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
    marginLeft: '5%',
  },
  profileContainer: {
    flexDirection: 'row',
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileRank: {
    width: 80,
    height: 80,
  },
});
