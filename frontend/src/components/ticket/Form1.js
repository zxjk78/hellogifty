import { View, Text, Image, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native-web";
import { GlobalStyles } from "../../constants/style";


const Form1 = ({ info, next }) => {
  const [price, setPrice] = useState(info.price);
  const [description, setDescription] = useState(info.description);

  return (
    <View>
      <Text style={{ marginVertical: 5 }}> 가격과 설명을 적어주세요 (1/3)</Text>
      <View style={styles.ticket}>
        <Image
          style={{ height: 50, width: 50, marginLeft: 10 }}
          source={require("../../assets/starbucks.jpg")}
        ></Image>
        <View>
          <Text style={{ marginTop: 10 }}>{info.item.brandName}</Text>
          <Text style={{ fontSize: 17 }}>{info.item.name}</Text>
          <Text>유효기간 {info.item.expirationDate} 까지</Text>
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
      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 20 }}>
        상품 설명
      </Text>
      <TextInput
        style={styles.inputText}
        multiline
        onChangeText={setDescription}
        // value={description}
        defaultValue={info.description}
        placeholder="상품 설명"
        keyboardType="string"
      />
      <Pressable style={styles.nextButton} onPress={()=>{next({price, description})}}>
        <Text style={styles.buttonText}>다음</Text>
      </Pressable>
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
    height: 150,
    width: 270,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "red",
    padding: 5,
    textAlignVertical: "top",
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
})