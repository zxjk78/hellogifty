import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import React, { useState } from "react";
import { GlobalStyles } from "../../constants/style";
import Icon from "react-native-vector-icons/Ionicons";
import SelectList from "react-native-dropdown-select-list";
import { largeCategoryDict } from "../../constants/data/idDictionary";
import { ModifiedGifticon } from "../../api/gifticon";

const ModifiedTicket = ({ onClose, item, refresh }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [name, setName] = useState(item.name);
  const [expirationDate, setExpirationDate] = useState(item.expirationDate);
  const [selected, setSelected] = useState(item.categoryId);
  // const [selected2, setSelected2] = useState(+gifticon.category);

  const data = [
    {
      key: 0,
      value: (
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../assets/largeCategory/img0.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text>{largeCategoryDict[0]}</Text>
        </View>
      ),
    },
    {
      key: 1,
      value: (
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../assets/largeCategory/img1.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text>{largeCategoryDict[1]}</Text>
        </View>
      ),
    },
    {
      key: 2,
      value: (
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../assets/largeCategory/img2.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text>{largeCategoryDict[2]}</Text>
        </View>
      ),
    },
    {
      key: 3,
      value: (
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../assets/largeCategory/img3.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text>{largeCategoryDict[3]}</Text>
        </View>
      ),
    },
    {
      key: 4,
      value: (
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../assets/largeCategory/img4.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text>{largeCategoryDict[4]}</Text>
        </View>
      ),
    },
    {
      key: 5,
      value: (
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../assets/largeCategory/img5.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text>{largeCategoryDict[5]}</Text>
        </View>
      ),
    },
  ];

  const completeButton = () => {
    setModalVisible(!modalVisible);
    ModifiedGifticon({name, expirationDate, selected})
    refresh()
  };
  return (
    <View style={styles.container}>
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
              <Text style={styles.modalText}>정보 수정</Text>
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
            <View>
              <Text style={styles.title}>이름</Text>
              <TextInput
                defaultValue={item.name}
                style={styles.input}
                onChangeText={setName}
              />
            </View>
            <View style={styles.middle}>
              <View style={{ flex: 2.5 }}>
                <Text style={styles.title}>유효기간</Text>
                <TextInput
                  defaultValue={item.expirationDate}
                  style={styles.expirationInput}
                  // onChangeText={setExpirationDate}
                />
              </View>

              <View style={{ flex: 1 }} />
              <View style={{ flex: 4, zIndex: 3 }}>
                <Text style={styles.title}>카테고리</Text>
                <SelectList
                  setSelected={setSelected}
                  data={data}
                  onSelect={() => {
                    setSelected(selected);
                  }}
                  dropdownStyles={{
                    backgroundColor: "#fff",
                    position: "absolute",
                    paddingRight: 10,
                    borderColor: "red",
                    width: '117%',
                  }}
                  placeholder="카테고리"
                  boxStyles={{
                    width: '117%',
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: "red",
                  }}
                  defaultOption={data[+item.categoryId] || false}
                />
              </View>
            </View>

            <Image
              // source={{
              //   uri: `data:image/jpeg;base64,${gifticon.couponImg}`,
              // }}
              source={require("../../assets/starbucks.jpg")}
              style={styles.couponImage}
            />
            <TouchableOpacity style={styles.completeButton} onPress={completeButton}>
              <Text>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModifiedTicket;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    // backgroundColor: 'green'
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
  // 내부
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
  },
  middle: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    marginTop: "5%",
    // borderWidth: 1,
  },
  input: {
    // width: '50%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "red",
    padding: 4,
    paddingLeft: 12,
  },
  expirationInput: {
    width: "120%",
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "red",
    padding: 4,
    paddingLeft: 12,
  },
  couponImage: {
    width: "80%",
    alignSelf: "center",
    height: 210,
    marginTop: "10%",
    resizeMode: "stretch",
    zIndex: 1,
  },
  completeButton: {
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
});
