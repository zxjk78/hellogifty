import { View, Text, Image, StyleSheet, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

const DetailScreen = ({ route }) => {
  const item = route.params.item.item;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: `😊 ${item.name} 사용이 완료되었습니다.✔️`,
      position: 'top',
      visibilityTime: 4000,
      topOffset: 10,
      // onShow: () => {},
      // onHide: () => {},
    });
  };

  const showToast2 = () => {
    Toast.show({
      type: 'error',
      text1: `${item.name} 를(을) 삭제 하였습니다.`,
      position: 'top',
      visibilityTime: 4000,
      topOffset: 10,
      // onShow: () => {},
      // onHide: () => {},
    });
  };

  const handleImg = () => {
    setImgVisible(!imgVisible)
  }

  const uesd = () => {
    showToast();
    // 사용완료 api 보내고
    setModalVisible(false);
    navigation.navigate("MyCouponScreen");
  };

  const deleteTicket = () => {
    showToast2();
    // 삭제 api 보내고
    setModalVisible2(!modalVisible2)
    navigation.navigate("MyCouponScreen");
  }

  return (
    <View style={styles.container}>
      {/* Modal */}
      {/* Used */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{item.name} 를(을) 사용하셨습니까?</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 150,
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>아니요</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={uesd}
              >
                <Text style={styles.textStyle}>네</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* Delete */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>정말 {item.name} 을(를) 삭제 하시겠습니까?</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 150,
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible2(!modalVisible2)}
              >
                <Text style={styles.textStyle}>아니요</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={deleteTicket}
              >
                <Text style={styles.textStyle}>네</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Image */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={imgVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setImgVisible(!imgVisible);
        }}
      >
        <Pressable onPress={handleImg} style={styles.imgModal}>
          <Image style={styles.bigImg} source={require("../assets/starbucks.jpg")} />
        </Pressable>
      </Modal>

      {/* Main */}
      <View style={{ flex: 8 }}>
        <Pressable onPress={handleImg}>
          <Image style={styles.img} source={require("../assets/starbucks.jpg")} />
          <Text style={{alignSelf: 'center', color: 'grey', fontSize: 15}}>이미지를 클릭해 확대할 수 있습니다.</Text>
        </Pressable>
        <View style={{marginTop: 30, alignItems: 'center'}}>
          <Text style={{fontSize: 15}}>{item.brandName}</Text>
          <Text style={{fontSize: 20}}>{item.name}</Text>
          <Text>유효기간 <Text style={{fontWeight: 'bold'}}>{item.expirationDate}</Text> 까지</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 18}}>사용 후 <Text style={{color: '#84dcc6'}}>사용 완료</Text> 버튼을 눌러주세요.</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Pressable
            style={styles.deleteButton}
            onPress={() => setModalVisible2(true)}
            android_ripple={{ color: "#ff686b" }}
          >
            <Text style={{color: "#ff686b"}}>삭제</Text>
          </Pressable>
          <Pressable
            style={styles.usedButton}
            onPress={() => setModalVisible(true)}
            android_ripple={{ color: "#84dcc6" }}
          >
            <Text>사용 완료</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    width: 320,
    height: 350,
    padding: 10,
    margin: 10,
    resizeMode: 'contain',
  },
  deleteButton: {
    width: 80,
    height: 50,
    margin: 5,
    borderWidth: 2,
    borderColor: "#ff686b",
    // backgroundColor: '#ff686b',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  usedButton: {
    width: 280,
    height: 50,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#a5ffd6",
    backgroundColor: "#a5ffd6",
    justifyContent: "center",
    alignItems: "center",
  },
  // Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'black',
    // marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "green",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 17,
    marginBottom: 15,
    textAlign: "center",
  },
  // imgModal
  imgModal: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  bigImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
});
