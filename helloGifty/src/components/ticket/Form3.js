import {
  View,
  Text,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {GlobalStyles} from '../../constants/style';
import {AddComma} from '../../utils/regexp';
import CustomImage from '../UI/CustomImage';
import {API_URL} from '../../api/config/http-config';

const Form3 = ({info, back, finish}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      {/* Modal */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>정말 등록하시겠습니까?</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 150,
                }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>아니요</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => finish(info)}>
                  <Text style={styles.textStyle}>네</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {/* Main */}
      <Text style={{marginVertical: 5, color: 'black'}}>
        {' '}
        판매될 상품의 모습을 확인해 주세요. (3/3)
      </Text>
      <View style={styles.main}>
        {/* <Image style={styles.img} source={{uri: info.imagePath}} /> */}
        <CustomImage
          source={API_URL + 'image/brand?path=' + info.brandImgPath}
          style={styles.img}
        />
        <View>
          <Text style={{color: 'black'}}>{info.brandName}</Text>
          <Text style={{fontSize: 17, color: 'black'}}>{info.name}</Text>
          <Text style={{color: 'black'}}>{info.expirationDate}</Text>
        </View>
        <View style={styles.nameText}>
          <Text style={{color: 'black'}}>이름</Text>
          <Text style={{color: 'black'}}>{AddComma(info.price)} 원</Text>
        </View>
      </View>
      <Text
        style={{fontSize: 17, fontStyle: 'bold', marginTop: 5, color: 'black'}}>
        제목
      </Text>
      <Text style={styles.title}>{info.title}</Text>
      <Text
        style={{fontSize: 17, fontStyle: 'bold', marginTop: 5, color: 'black'}}>
        상품 설명
      </Text>
      <ScrollView style={styles.description}>
        <Text style={{padding: 2, color: 'black'}}>{info.content}</Text>
      </ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Pressable
          style={styles.nextButton}
          onPress={() => {
            back();
          }}>
          <Text style={styles.buttonText}>이전</Text>
        </Pressable>
        <Pressable
          style={styles.nextButton}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={styles.buttonText}>완료</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Form3;

const styles = StyleSheet.create({
  img: {
    width: 70,
    height: 70,
  },
  price: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: {
    width: 270,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'pink',
    padding: 2,
  },
  title: {
    borderWidth: 2,
    borderColor: 'red',
    marginTop: 5,
    padding: 2,
    color: 'black',
  },
  description: {
    borderWidth: 2,
    borderColor: 'red',
    height: 150,
    marginTop: 5,
    // overflow: 'scroll'
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
  nameText: {
    height: 70,
    justifyContent: 'space-between',
  },
  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
    // marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 17,
    marginBottom: 15,
    textAlign: 'center',
  },
});
