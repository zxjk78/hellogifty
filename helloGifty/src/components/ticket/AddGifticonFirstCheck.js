import {StyleSheet, Text, View, Image, Pressable} from 'react-native';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import {Badge} from 'react-native-paper';

import {Button} from 'react-native-paper';
import {FlatGrid} from 'react-native-super-grid';

import React, {useState} from 'react';
import {GlobalStyles} from '../../constants/style';

const CouponImage = ({item, onSelect}) => {
  const [selected, setSelected] = useState(false);
  const handleSelect = () => {
    setSelected(!selected);
    onSelect(item.idx, !selected);
  };

  return (
    <Pressable
      // 이렇게 배열로 해도 되는듯?
      style={[styles.itemContainer, {backgroundColor: '#fff'}]}
      onPress={handleSelect}>
      <Image
        source={{uri: item.imgPath}}
        style={[{width: '100%', height: '100%'}, {opacity: selected ? 0.5 : 1}]}
      />
      {selected && (
        <View style={{position: 'absolute', left: '40%', bottom: '40%'}}>
          <AntIcon name="delete" size={50} color={'red'} />
        </View>
      )}
    </Pressable>
  );
};

const AddGifticonFirstCheck = ({imageStringArr, onClose, onSubmit}) => {
  const [falseGifticonIdxArr, setfalseGifticonIdxArr] = useState([]);
  const handleSelect = (idx, select) => {
    // select : 기프티콘이 아니라고 선택한 것들
    // console.log('선택된 기프티콘', idx, select);
    if (select) {
      setfalseGifticonIdxArr(prev => [...prev, idx]);
    } else {
      setfalseGifticonIdxArr(prev =>
        prev.filter(couponIdx => couponIdx !== idx),
      );
    }
  };

  const handleSubmit = () => {
    onSubmit(falseGifticonIdxArr);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.txtContainer}>
        <Text>
          인식한 이미지들 중{'\n'}
          <Text
            style={{
              fontWeight: 'bold',
              color: GlobalStyles.colors.mainPrimary,
            }}>
            기프티콘이 아닌 것을
          </Text>{' '}
          골라 주세요.
        </Text>
        <View>
          <FIcon name="trash-alt" size={30} />
          {falseGifticonIdxArr.length > 0 && (
            <Badge style={{position: 'absolute', top: -5, right: -7}}>
              {falseGifticonIdxArr.length}
            </Badge>
          )}
        </View>
      </View>

      <View style={styles.imgContainer}>
        <FlatGrid
          itemDimension={130}
          data={imageStringArr}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          spacing={10}
          // renderItem={({ item }) => <CouponImage item={item} />}
          renderItem={({item}) => (
            <CouponImage item={item} onSelect={handleSelect} />
          )}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button mode="outlined" onPress={onClose}>
          그만두기
        </Button>
        <Button mode="contained" onPress={handleSubmit}>
          다음으로
        </Button>
      </View>
    </View>
  );
};

export default AddGifticonFirstCheck;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: '5%',
    flex: 1,
  },
  txtContainer: {
    paddingHorizontal: '5%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
