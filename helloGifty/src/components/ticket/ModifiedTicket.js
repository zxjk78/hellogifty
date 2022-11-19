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
} from 'react-native';
import {Button} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {GlobalStyles} from '../../constants/style';
import Icon from 'react-native-vector-icons/Ionicons';
// import SelectList from 'react-native-dropdown-select-list';
import CategoryDropdown from '../UI/CategoryDropdown';
import {
  largeCategoryData,
  smallCategoryData,
} from '../../constants/data/categoryData';
import {getGifticonDetail, ModifiedGifticon} from '../../api/gifticon';
import {API_URL} from '../../api/config/http-config';
import CustomImage from '../UI/CustomImage';

const ModifiedTicket = ({onClose, item, refresh}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [name, setName] = useState(item.name);
  const [gifticon, setGifticon] = useState(null);
  const [expirationDate, setExpirationDate] = useState(item.expirationDate);
  const [largeCategoryId, setLargeCategoryId] = useState(-1);
  const [smallCategoryId, setSmallCategoryId] = useState(item.categoryId % 2);
  const [largeChanged, setLargeChanged] = useState(true);
  const [categoryId, setCategoryId] = useState(-1);

  // const [selected2, setSelected2] = useState(+gifticon.category);

  useEffect(() => {
    (async () => {
      const gifticonInfo = await getGifticonDetail(item.id);
      console.log(gifticonInfo, '가져온 기프티콘 정보~~');
      setGifticon(() => gifticonInfo);
    })();
  }, [item.id]);

  console.log(item, '정보수정 아이템');

  // console.log(smallCategoryData[+selected[0]][+selected[1]], '확인확인');

  const completeButton = () => {
    setModalVisible(!modalVisible);
    ModifiedGifticon({name, expirationDate, largeCategoryId, smallCategoryId});
    refresh();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.modalText}>정보 수정</Text>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  onClose();
                }}>
                <Text style={styles.textStyle}>
                  <Icon name="close-sharp" style={styles.icon}></Icon>
                </Text>
              </Pressable>
            </View>
            <View>
              <View>
                <Text style={styles.title}>이름</Text>
                <TextInput
                  defaultValue={item.name}
                  style={styles.input}
                  onChangeText={setName}
                />
              </View>
              <View>
                <Text style={styles.title}>유효기간</Text>
                <TextInput
                  defaultValue={item.expirationDate}
                  style={styles.input}
                  // onChangeText={setExpirationDate}
                />
              </View>
            </View>
            <View style={styles.middle}>
              {/* <View style={{ flex: 1 }} /> */}
              <CategoryDropdown
                categoryItem={largeCategoryData}
                onChange={lgCId => {
                  setLargeCategoryId(lgCId);
                  setLargeChanged(!largeChanged);
                }}
                defaultTxt="대분류"
              />
              {/* <View style={{width: '10%'}} /> */}
              <CategoryDropdown
                categoryItem={smallCategoryData[largeCategoryId] || null}
                onChange={smCId => setCategoryId(smCId)}
                largeChanged={largeChanged}
                defaultTxt="소분류"
              />
            </View>

            <CustomImage
              source={API_URL + 'image/gifticon?path=' + gifticon?.img}
              style={styles.couponImage}
            />
            <TouchableOpacity
              style={styles.completeButton}
              onPress={completeButton}>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    // backgroundColor: 'green'
  },
  modalView: {
    height: 550,
    width: 340,
    margin: 20,
    backgroundColor: 'white',
    padding: 35,
    paddingVertical: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
  modalText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  textStyle: {
    marginTop: 7,
  },
  icon: {
    fontSize: 20,
  },
  // 내부
  title: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
    width: '90%',
    marginLeft: -10,
    // borderWidth: 1,
  },
  input: {
    // width: '50%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
    padding: 4,
    paddingLeft: 12,
    color: 'black',
  },
  expirationInput: {
    width: '110%',
    height: 40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
    padding: 4,
    paddingLeft: 12,
    marginLeft: 5,
    color: 'black',
  },
  couponImage: {
    width: '80%',
    alignSelf: 'center',
    height: 210,
    marginTop: '5%',
    resizeMode: 'stretch',
    zIndex: 1,
  },
  completeButton: {
    width: 120,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: GlobalStyles.colors.mainPrimary,
  },
});
