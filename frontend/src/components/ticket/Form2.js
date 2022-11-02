import { View, Text, Image, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { GlobalStyles } from "../../constants/style";
import ImagePicker from 'react-native-image-crop-picker';

const Form2 = ({ info, originalImgPath, next, back }) => {
  const [imagePath, setImagePath] = useState(info.imagePath)
  // const [picture, setPicture] = useState()

  // const cropViewRef = useRef();

  const imgPress = () => {
    ImagePicker.openCropper({
      path: originalImgPath,
      width: 280,
      height: 351,
      freeStyleCropEnabled: true

    }).then(image => {
      setImagePath(image.path)
    });
  };

  // cropViewRef.saveImage(true, 90)
  // cropViewRef.rotateImage(true)

  return (
    <View>
      <Text style={{ marginVertical: 5 }}>
        {" "}
        <Text>사진에 </Text><Text style={{fontSize: 15, fontWeight: 'bold'}}>바코드</Text>와 <Text style={{fontSize: 15, fontWeight: 'bold'}}>일련번호</Text>가 나오지 않도록, 확인하시고 잘라 주세요. (2/3)
      </Text>
      <Pressable onPress={imgPress}>
        <Image style={styles.img} source={{ uri: imagePath }} />
      </Pressable>
      {/* 버튼 */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable style={styles.nextButton} onPress={()=>{back({imagePath})}}>
          <Text style={styles.buttonText}>이전</Text>
        </Pressable>
        <Pressable style={styles.nextButton} onPress={()=>{next({imagePath})}}>
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
  nextButton: {
    width: 120,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
