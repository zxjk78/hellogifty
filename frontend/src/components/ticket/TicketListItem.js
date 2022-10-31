import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import { GlobalStyles } from "../../constants/style";
// external module
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ModifiedTicket from "./ModifiedTicket";
import SellingTicket from "./SellingTicket";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

// https://callstack.github.io/react-native-paper/card.html

// 을 보면 style은 viewStyle을 따른다고 하고 이는  을 말한다.

const TicketListItem = (item) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modifiedModal, setModifiedModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);

  const goSell = () => {
    setModalVisible(false);
    setSellModal(true);
  }

  const closeSell = () => {
    setSellModal(false);
  }

  const modified = () => {
    setModalVisible(false);
    setModifiedModal(true);
  }

  const closeModified = () => {
    setModifiedModal(false);
  }


  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("DetailScreen", { item: item });
      }}
      delayLongPress={0}
      onLongPress={() => {
        setModalVisible(true);
      }}
    >
      {/* Modal */}
      <View style={styles.modalContainer}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.buttonClass]}
                onPress={() => goSell()}
              >
                <Text style={styles.buttonText}>판매하기</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonClass]}
                onPress={() => modified()}
              >
                <Text style={styles.buttonText}>정보 수정</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      {modifiedModal ? <ModifiedTicket onClose={closeModified} item={item.item} /> : null}
      {sellModal ? <SellingTicket onClose={closeSell} item={item.item} /> : null}
      {/* Main */}
      <Image
        style={styles.img}
        source={require("../../assets/starbucks.jpg")}
      />
      <View style={styles.text}>
        <Text style={styles.brandName}>{item.item.brandName}</Text>
        <Text style={styles.itemName}>{item.item.name}</Text>
        <Text style={styles.expiration}>
          유효기간: {item.item.expirationDate} 까지
        </Text>
      </View>
      {/* <Image /> */}
      <Text>{item.item.categoryId}</Text>
    </TouchableOpacity>
  );
};

export default TicketListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.backgroundComponent,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    // borderColor: 'grey',
    justifyContent: "space-between",
    // marginBottom: -30,
    // position: 'relative',
  },
  img: {
    // flex: 2,
    marginRight: 40,
    height: 100,
    width: 100,
    resizeMode: "cover",
  },
  text: {
    flex: 4,
  },
  brandName: {
    fontSize: 15,
  },
  itemName: {
    fontSize: 20,
  },
  expiration: {
    fontSize: 12,
  },
  modalContainer: {
    
  },
  centeredView: {
    // position: 'absolute',
    // right: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: 'flex-end',
    marginTop: 22,
    marginLeft: 22,
  },
  modalView: {
    // alignSelf: 'flex-end',
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'red',
    padding: 15,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
  },
  button: {
    margin: 2,
    borderRadius: 10,
    color: 'black',
    padding: 7,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    width: '30%',
    backgroundColor: "#2196F3",
  },
  buttonClass: {

  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 2,
  },
  textStyle: {
    color: "white",
  },
  modalText: {
    marginBottom: 15,
  },
});
