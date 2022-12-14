import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {GlobalStyles} from '../../constants/style';
import ImagePicker from 'react-native-image-crop-picker';
import CustomImage from '../UI/CustomImage';
import {API_URL} from '../../api/config/http-config';

const Form2 = ({info, next, back}) => {
  const [imagePath, setImagePath] = useState(info.imagePath);
  const [picture, setPicture] = useState(info.picture);
  // const cropViewRef = useRef();

  const imgPress = () => {
    ImagePicker.openCropper({
      path: info.originalImgPath,
      width: 280,
      height: 351,
      freeStyleCropEnabled: true,
      includeBase64: true,
    })
      .then(image => {
        // console.log(Object.keys(image));
        setPicture('data:image/jpeg;base64,' + image.data);
        setImagePath(image.path);
        console.log(image.path, 'crop image path');
      })
      .catch(error => console.log(error));
  };

  // cropViewRef.saveImage(true, 90)
  // cropViewRef.rotateImage(true)

  return (
    <View>
      <Text style={{marginVertical: 5, color: 'black'}}>
        {' '}
        <Text style={{color: 'black'}}>사진에 </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
          바코드
        </Text>
        와{' '}
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
          일련번호
        </Text>
        가 나오지 않도록, 확인하시고 잘라 주세요. (2/3)
      </Text>
      <Pressable onPress={imgPress}>
        <CustomImage source={imagePath} style={styles.img} />
        {/* <Image style={styles.img} source={{ uri: info.imagePath }} /> */}
      </Pressable>
      {/* 버튼 */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Pressable
          style={styles.nextButton}
          onPress={() => {
            back({imagePath, picture});
          }}>
          <Text style={styles.buttonText}>이전</Text>
        </Pressable>
        <Pressable
          style={styles.nextButton}
          onPress={() => {
            next({imagePath, picture});
          }}>
          <Text style={styles.buttonText}>다음</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Form2;

const styles = StyleSheet.create({
  img: {
    width: 280,
    height: 351,
    // resizeMode: "center",
  },
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
    textAlign: 'right',
  },
  inputText: {
    height: 150,
    width: 270,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'red',
    padding: 5,
    textAlignVertical: 'top',
    // textAlign: "left",
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
