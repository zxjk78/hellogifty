import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React, { useRef } from 'react';
import { Button } from 'react-native-paper';

import { GlobalStyles } from '../../constants/style';
const AddGifticonForm = ({ idx, gifticon, isEnd, handleNext, handlePrev }) => {
  const nameRef = useRef();
  const expireDateRef = useRef();
  const categoryRef = useRef();

  const nextHandler = () => {
    handleNext(idx, {
      text: nameRef.current.value,
      expireDate: expireDateRef.current.value,
      // category: categoryRef.current.value,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>이름</Text>
          <TextInput
            defaultValue={gifticon.text}
            style={styles.input}
            ref={nameRef}
          />
        </View>
        <View style={styles.middle}>
          <View style={{ flex: 2 }}>
            <Text style={styles.title}>유효기간</Text>
            <TextInput
              defaultValue={gifticon.expireDate}
              style={styles.input}
              ref={expireDateRef}
            />
          </View>

          <View style={{ flex: 1 }} />
          <View style={{ flex: 2 }}>
            <Text style={styles.title}>카테고리</Text>
          </View>
        </View>

        <Image
          source={{
            uri: `data:image/jpeg;base64,${gifticon.couponImg}`,
          }}
          style={styles.couponImage}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={handlePrev}>
          이전
        </Button>
        <Button mode="contained" onPress={nextHandler}>
          {isEnd ? `완료` : `다음`}
        </Button>
      </View>
    </View>
  );
};

export default AddGifticonForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.backgroundComponent,
    // backgroundColor: 'red',
    padding: '10%',
    paddingTop: '5%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: '5%',
  },
  input: {
    // width: '50%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
    padding: 4,
    paddingLeft: 12,
  },
  couponImage: {
    width: '100%',
    height: 300,
    marginTop: '10%',
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
