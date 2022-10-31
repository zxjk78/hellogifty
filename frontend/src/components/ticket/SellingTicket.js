import { View, Image, TextInput, Text, StyleSheet, Alert, Modal, Pressable } from "react-native";
import React, { useState } from "react";

const SellingTicket = ({ onClose, item }) => {
  const [modalVisible, setModalVisible] = useState(true)
  const [price, setPrice] = useState(0)
  console.log(item);

  return (
    <View style={{ backgroundColor: 'blue'}}>
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
            <Text style={styles.modalText}>판매 등록</Text>
            <Text> 가격과 설명을 적어주세요 (1/3)</Text>
            <View style={styles.ticket}>
              <Image
                style={{height: 50, width: 50, marginLeft: 10}}
                source={require("../../assets/starbucks.jpg")}
              ></Image>
              <View>
                <Text style={{marginTop: 10}}>{item.brandName}</Text>
                <Text style={{fontSize: 17}}>{item.name}</Text>
                <Text>유효기간 {item.expirationDate} 까지</Text>
              </View>
            </View>
            <View style={styles.price}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>가격</Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput style={{borderWidth: 1, borderColor: 'black'}} placeholder="0"></TextInput>
                <Text style={{fontWeight: 'bold', fontSize: 20}}> 원</Text>
              </View>
            </View>
            <Pressable
              style={[styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible)
                onClose()
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
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
    marginTop: 40
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
    borderColor: 'red',
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
    fontWeight: 'bold',
    textAlign: 'left',
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
    justifyContent: 'space-between'
  }
});
