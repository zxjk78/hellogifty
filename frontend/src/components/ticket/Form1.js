import { View, Text, Image, TextInput, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../../constants/style";


const Form1 = ({ info, next }) => {
  const [price, setPrice] = useState(info.price);
  const [title, setTitle] = useState(info.title)
  const [content, setContent] = useState(info.content);

  return (
    <View>
      <Text style={{ marginVertical: 5 }}> 가격과 설명을 적어주세요 (1/3)</Text>
      <View style={styles.ticket}>
        <Image
          style={{ height: 50, width: 50, marginLeft: 10 }}
          // image 주소 바꾸기
          source={require("../../assets/starbucks.jpg")}
        ></Image>
        <View>
          {/* <Text style={{ marginTop: 10 }}>{info.item}</Text> */}
          <Text style={{ fontSize: 17 }}>{info.name}</Text>
          <Text>유효기간 {info.expirationDate} 까지</Text>
        </View>
      </View>
      <View style={styles.price}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>가격</Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.input}
            onChangeText={setPrice}
            // value={price}
            defaultValue={info.price}
            placeholder="0"
            keyboardType="numeric"
          />
          <Text style={{ fontWeight: "bold", fontSize: 20 }}> 원</Text>
        </View>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>
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
      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>
        상품 설명
      </Text>
      <TextInput
        style={styles.inputText}
        multiline
        onChangeText={setContent}
        // value={description}
        defaultValue={info.description}
        placeholder="상품 설명을 입력해 주세요"
        keyboardType="string"
      />
      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={()=>{next({price, title, content})}}
        activeOpacity = {0.5}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "pink",
    padding: 3,
    marginTop: 5,
  },
  price: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    height: 30,
    width: 100,
    // margin: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "red",
    paddingRight: 10,
    textAlign: "right",
  },
  inputText: {
    height: 100,
    width: 270,
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "red",
    padding: 5,
    textAlignVertical: "top",
    // textAlign: "left",
  },
  titleInput: {
    height: 30,
    width: 270,
    marginTop: 8,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "red",
    padding: 5,
    textAlignVertical: "top",
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
})