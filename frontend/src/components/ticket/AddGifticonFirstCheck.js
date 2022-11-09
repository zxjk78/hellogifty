import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';

import React, { useState } from 'react';

const CouponImage = ({ item }) => {
  const handleSelect = () => {
    console.log(item.index);
  };

  <Pressable
    // 이렇게 배열로 해도 되는듯?
    style={[styles.itemContainer, { backgroundColor: '#fff' }]}
    onPress={handleSelect}
  >
    <Image
      source={{ uri: 'data:image/jpeg;base64,' + item.couponImg }}
      style={{ width: '100%', height: '100%' }}
    />
  </Pressable>;
};

const AddGifticonFirstCheck = ({ imageStringArr, handleClose }) => {
  const [notGifticon, setNotGifticon] = useState([]);
  const handleSelect = (e) => {
    console.log('타겟: ', e.target);
  };
  // console.log('배열길이', Object.keys(imageStringArr));
  return (
    <View style={styles.wrapper}>
      <View style={styles.txtContainer}>
        <Text>
          인식한 이미지들 중{' '}
          <Text style={{ fontWeight: 'bold' }}>기프티콘이 아닌 것을</Text> 골라
          주세요.
        </Text>
      </View>
      <View style={styles.imgContainer}>
        <FlatGrid
          itemDimension={130}
          data={imageStringArr}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          spacing={10}
          renderItem={({ item }) => (
            <Pressable
              // 이렇게 배열로 해도 되는듯?
              style={[styles.itemContainer, { backgroundColor: '#fff' }]}
              onPress={handleSelect}
            >
              <Image
                source={{ uri: 'data:image/jpeg;base64,' + item.couponImg }}
                style={{ width: '100%', height: '100%' }}
              />
            </Pressable>
          )}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button mode="outlined" onPress={handleClose}>
          그만두기
        </Button>
        <Button mode="contained">다음으로</Button>
      </View>
    </View>
  );
};

export default AddGifticonFirstCheck;

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    marginLeft: '5%',
    flex: 1,
  },
  txtContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    flex: 5,
    // backgroundColor: 'red',
  },
  btnContainer: {
    flex: 1,
    width: '90%',
    marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 0,
    height: 200,
  },
});
