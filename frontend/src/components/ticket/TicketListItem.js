import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  Modal,
} from 'react-native';
import { GlobalStyles } from '../../constants/style';
// external module
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { largeCategoryDict } from '../../constants/data/idDictionary';

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ModifiedTicket from './ModifiedTicket';
import SellingTicket from './SellingTicket';
import CustomImage from '../UI/CustomImage';
import { API_URL } from '../../api/config/http-config';

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

// https://callstack.github.io/react-native-paper/card.html

const TicketListItem = ({ item, isNormal, refresh, type }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modifiedModal, setModifiedModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  // console.log(item);

  const imgUrl = [
    require('../../assets/largeCategory/img0.png'),
    require('../../assets/largeCategory/img1.png'),
    require('../../assets/largeCategory/img2.png'),
    require('../../assets/largeCategory/img3.png'),
    require('../../assets/largeCategory/img4.png'),
    require('../../assets/largeCategory/img5.png'),
  ];

  const goSell = () => {
    setModalVisible(false);
    setSellModal(true);
  };

  const closeSell = () => {
    setSellModal(false);
  };

  const modified = () => {
    setModalVisible(false);
    setModifiedModal(true);
  };

  const closeModified = () => {
    setModifiedModal(false);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('DetailScreen', { item: item, refresh: refresh });
      }}
      delayLongPress={500}
      onLongPress={(e) => {
        if (type === 0) {
          let x = e.nativeEvent.touches[0].pageX;
          const y = e.nativeEvent.touches[0].pageY - 80;

          if (x >= 250) {
            x -= 170;
          } else {
            x += 25;
          }

          setPosition({
            x: x,
            y: y,
          });
          setModalVisible(true);
        }
      }}
    >
      {/* Modal */}
      <View style={styles.modalContainer}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <Pressable
            style={styles.modalBack}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <View
              style={{ ...styles.modalView, left: position.x, top: position.y }}
            >
              <Pressable
                style={[styles.buttonClass]}
                onPress={() => goSell()}
                android_ripple={{ color: 'red' }}
              >
                <Text style={styles.buttonText}>판매하기</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonClass]}
                onPress={() => modified()}
                android_ripple={{ color: 'red' }}
              >
                <Text style={styles.buttonText}>정보 수정</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </View>
      {modifiedModal ? (
        <ModifiedTicket onClose={closeModified} item={item} refresh={refresh} />
      ) : null}
      {sellModal ? (
        <SellingTicket onClose={closeSell} item={item} refresh={refresh} />
      ) : null}

      {/* Main */}
      <CustomImage source={API_URL + 'image/brand?path=' + item.brandImgPath} />

      <View style={styles.text}>
        <Text style={styles.brandName}>{item.brandName}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.expiration}>
          유효기간: {item.expirationDate} 까지
        </Text>
      </View>
      {/* <Image /> */}
      {/* <Text>{categoryImg[+item.categoryId]}</Text> */}
      <Image
        source={imgUrl[item.categoryId]}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
  );
};

export default TicketListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.backgroundComponent,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  img: {
    marginRight: 40,
    height: 100,
    width: 100,
    resizeMode: 'cover',
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
    // backgroundColor: 'blue',
    // height:200
  },
  modalBack: {
    // backgroundColor: "blue",
    height: '100%',
  },
  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-end',
    // width: 170,
    // marginTop: 22,
    // marginLeft: 22,
    // backgroundColor: "black",
  },
  modalView: {
    position: 'absolute',
    margin: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#829460',
    padding: 10,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    // margin: 2,
    borderRadius: 10,
    color: '#EEEEEE',
    // padding: 7,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    width: '30%',
    backgroundColor: '#2196F3',
  },
  buttonClass: {
    backgroundColor: '#FFE1E1',
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 3,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 2,
  },
  textStyle: {
    color: 'white',
  },
  modalText: {
    marginBottom: 15,
  },
});
