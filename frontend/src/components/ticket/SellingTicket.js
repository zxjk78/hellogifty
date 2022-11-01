import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  Modal,
  Button,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { GlobalStyles } from "../../constants/style";

const SellingTicket = ({ onClose, item }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [formIdx, setFormIdx] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  // console.log(item);



  const next = () => {
    setFormIdx((prev) => prev + 1)
  };
  const back = () => {
    setFormIdx((prev) => prev - 1)
  }

  const Form1 = () => {
    return (
      <View>
        <Text style={{ marginVertical: 5 }}>
          {" "}
          가격과 설명을 적어주세요 (1/3)
        </Text>
        <View style={styles.ticket}>
          <Image
            style={{ height: 50, width: 50, marginLeft: 10 }}
            source={require("../../assets/starbucks.jpg")}
          ></Image>
          <View>
            <Text style={{ marginTop: 10 }}>{item.brandName}</Text>
            <Text style={{ fontSize: 17 }}>{item.name}</Text>
            <Text>유효기간 {item.expirationDate} 까지</Text>
          </View>
        </View>
        <View style={styles.price}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>가격</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.input}
              onChangeText={setPrice}
              value={price}
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
          value={description}
          placeholder="상품 설명"
          // keyboardType="numeric"
        />
        <Pressable style={styles.nextButton} onPress={next}>
          <Text style={styles.buttonText}>다음</Text>
        </Pressable>
      </View>
    );
  };

  const Form2 = () => {
    return (
      <View>
        <Text style={{ marginVertical: 5 }}>
          {" "}
          가격과 설명을 적어주세요 (2/3)
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable style={styles.nextButton} onPress={back}>
            <Text style={styles.buttonText}>이전</Text>
          </Pressable>
          <Pressable style={styles.nextButton} onPress={next}>
            <Text style={styles.buttonText}>다음</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const formArray = [<Form1 />, <Form2 />]

  return (
    <View style={{ backgroundColor: "blue" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.modalText}>판매 등록</Text>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  onClose();
                }}
              >
                <Text style={styles.textStyle}>
                  <Icon name="close-sharp" style={styles.icon}></Icon>
                </Text>
              </Pressable>
            </View>
            {formArray[formIdx]}
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        // onPress={() => setModalVisible(true)}
      >
        {/* <Text style={styles.textStyle}>Modal</Text> */}
      </Pressable>
    </View>
  );
};

export default SellingTicket;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'black',
    // height: 300
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  modalView: {
    height: 550,
    width: 340,
    margin: 20,
    backgroundColor: "white",
    padding: 35,
    paddingVertical: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "red",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5
  },
  modalText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
  },
  textStyle: {
    marginTop: 7,
  },
  icon: {
    fontSize: 25,
  },
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
});
