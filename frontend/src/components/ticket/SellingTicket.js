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
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { GlobalStyles } from "../../constants/style";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import { getGifticonDetail, sellMyGifticon } from "../../api/gifticon";

const SellingTicket = ({ onClose, item, refresh }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [formIdx, setFormIdx] = useState(0);
  const [sellingInfo, setSellingInfo] = useState({
    price: 0,
    title: "",
    content: "",
    imagePath: "1",
    id: item.id,
    brandName: item.brandName
  });

  // 임시
  const uri = item.brandImgPath
  // console.log(item, '여기여기여기')
  useEffect(() => {
    (async () => {
      const data = await getGifticonDetail(item.id);
      console.log(data);
      setSellingInfo({...data, price:0, originalImgPath:data.img, title:'', content: '', imagePath: data.img});
    })();
  }, [item]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: `😊 ${item.name} 판매 등록이 완료되었습니다.✔️`,
      position: 'top',
      visibilityTime: 4000,
      topOffset: 10,
      // onShow: () => {},
      // onHide: () => {},
    });
  };


  const next = (data) => {
    setSellingInfo((prev) => {
      return { ...prev, ...data };
    });
    setFormIdx((prev) => prev + 1);
  };

  const back = (data) => {
    setSellingInfo((prev) => {
      return { ...prev, ...data };
    });
    setFormIdx((prev) => prev - 1);
  };

  // 서버로 데이터 보내기
  const finish = async (info) => {
    // console.log(info, '여기가 인포~~');
    showToast();
    setModalVisible(false);
    await sellMyGifticon(info);
    refresh();
  };

  const formArray = [
    <Form1 next={next} info={sellingInfo} />,
    <Form2 next={next} back={back} info={sellingInfo} />,
    <Form3 back={back} finish={finish} info={sellingInfo} />,
  ];

  return (
    <View>
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
