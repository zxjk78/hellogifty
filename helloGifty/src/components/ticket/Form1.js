import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyles} from '../../constants/style';
import CustomImage from '../UI/CustomImage';

import {API_URL} from '../../api/config/http-config';

const Form1 = ({info, next}) => {
  const [price, setPrice] = useState(info.price);
  const [title, setTitle] = useState(info.title);
  const [content, setContent] = useState(info.content);

  return (
    <View>
      <Text style={{marginVertical: 5, color: 'black'}}>
        {' '}
        가격과 설명을 적어주세요 (1/3)
      </Text>
      <View style={styles.ticket}>
        <CustomImage
          source={API_URL + 'image/brand?path=' + info.brandImgPath}
          style={{height: 50, width: 50}}
        />
        <View>
          <Text style={{marginTop: 10, color: 'black'}}>{info.brandName}</Text>
          <Text style={{fontSize: 17, color: 'black'}}>{info.name}dfdf</Text>
          <Text style={{color: 'black'}}>
            유효기간 {info.expirationDate} 까지
          </Text>
        </View>
      </View>
      <View style={styles.price}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
          가격
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.input}
            onChangeText={setPrice}
            // value={price}
            defaultValue={info.price}
            placeholder="0"
            keyboardType="numeric"
          />
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
            {' '}
            원
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          marginTop: 10,
          color: 'black',
        }}>
        제목
      </Text>
      <TextInput
        style={styles.titleInput}
        multiline
        onChangeText={setTitle}
        // value={description}
        defaultValue={info.title}
        placeholder="제목을 입력해 주세요"
        maxLength={23}
        keyboardType="string"
      />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          marginTop: 10,
          color: 'black',
        }}>
        상품 설명
      </Text>
      <TextInput
        style={styles.inputText}
        multiline
        onChangeText={setContent}
        // value={description}
        defaultValue={info.content}
        placeholder="상품 설명을 입력해 주세요"
        keyboardType="string"
      />
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          next({price, title, content});
        }}
        activeOpacity={0.5}
        // android_ripple={{color: 'red'}}
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form1;

const styles = StyleSheet.create({
  ticket: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'pink',
    padding: 3,
    marginTop: 5,
  },
  price: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 30,
    width: 100,
    // margin: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'red',
    paddingRight: 10,
    padding: 0,
    textAlign: 'right',
    color: 'black',
  },
  inputText: {
    height: 100,
    width: 270,
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'red',
    padding: 5,
    textAlignVertical: 'top',
    color: 'black',
    // textAlign: "left",
  },
  titleInput: {
    height: 30,
    width: 270,
    marginTop: 8,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'red',
    padding: 5,
    textAlignVertical: 'top',
    color: 'black',
  },
  nextButton: {
    width: 120,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: GlobalStyles.colors.mainPrimary,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
