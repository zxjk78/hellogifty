import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { GlobalStyles } from "../../constants/style";
import Form1 from "./Form1";
import Form2 from "./Form2";

const SellingTicket = ({ onClose, item }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [formIdx, setFormIdx] = useState(0);

  // 임시
  const uri = "https://mblogthumb-phinf.pstatic.net/MjAxODA5MjhfMjI3/MDAxNTM4MTQwNjMzNzI5.c7ZF7CxdxBkwou-yz5d4JnsF1mUGeNyBKd6cM28I4Ikg.sxZ2LGLrc9sC3NBGqpAE4XqHRyFVAZJks-MRwUOShP8g.JPEG.zoqgns7549/KakaoTalk_20180928_220601336.jpg?type=w800"
  const [sellingInfo , setSellingInfo] = useState({
    price:0, 
    description:"",
    imagePath: uri,
    item: item
  })

  const next = (data) => {
    setSellingInfo((prev) => {
      return {...prev, ...data}
    })
    setFormIdx((prev) => prev + 1)
  };

  const back = (data) => {
    setSellingInfo((prev) => {
      return {...prev, ...data}
    })
    setFormIdx((prev) => prev - 1)
  };

  const check = () => {
    console.log(sellingInfo)
  }

  const formArray = [<Form1 next={next} info={sellingInfo}/>, <Form2 next={next} back={back} originalImgPath={uri} info={sellingInfo}/>]

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
});
