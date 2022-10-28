import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Alert, Modal } from "react-native";
import { GlobalStyles } from "../../constants/style";
// external module
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

// https://callstack.github.io/react-native-paper/card.html

// 을 보면 style은 viewStyle을 따른다고 하고 이는  을 말한다.

const TicketListItem = (item) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("DetailScreen", { item: item });
      }}
      delayLongPress={600}
      onLongPress={() => {
        setModalVisible(true);
      }}
    >
      {/* Modal */}
      <View style={styles.centeredView}>
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
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
    marginBottom: 15,
    textAlign: "center",
  },
});
