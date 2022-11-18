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
import { Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { GlobalStyles } from '../../constants/style';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectList from 'react-native-dropdown-select-list';
import {
  largeCategoryDict,
  smallCategoryDict,
} from '../../constants/data/idDictionary';
import { getGifticonDetail, ModifiedGifticon } from '../../api/gifticon';
import { API_URL } from '../../api/config/http-config';
import CustomImage from '../UI/CustomImage';

const ModifiedTicket = ({ onClose, item, refresh }) => {
  const smallCategoryId = item.categoryId % 2 ? 1 : 0;
  const [modalVisible, setModalVisible] = useState(true);
  const [name, setName] = useState(item.name);
  const [expirationDate, setExpirationDate] = useState(item.expirationDate);
  const [selected, setSelected] = useState([
    Math.ceil(item.categoryId / 2) - 1,
    smallCategoryId,
  ]);
  // const [selected2, setSelected2] = useState(+gifticon.category);

  useEffect(() => {
    (async () => {
      const gifticonInfo = await getGifticonDetail(item.id);
      console.log(gifticonInfo, '가져온 기프티콘 정보~~');
    })();
  }, []);

  const largeCategoryData = [
    {
      key: 0,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/largeCategory/img0.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text>{largeCategoryDict[0]}</Text>
        </View>
      ),
    },
    {
      key: 1,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/largeCategory/img1.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text>{largeCategoryDict[1]}</Text>
        </View>
      ),
    },
    {
      key: 2,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/largeCategory/img2.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text>{largeCategoryDict[2]}</Text>
        </View>
      ),
    },
    {
      key: 3,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/largeCategory/img3.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text>{largeCategoryDict[3]}</Text>
        </View>
      ),
    },
    {
      key: 4,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/largeCategory/img4.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text>{largeCategoryDict[4]}</Text>
        </View>
      ),
    },
    {
      key: 5,
      value: (
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/largeCategory/img5.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text>{largeCategoryDict[5]}</Text>
        </View>
      ),
    },
  ];

  const smallCategoryData = [
    [
      {
        key: 1,
        value: (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/largeCategory/img0.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text>{smallCategoryDict[1]}</Text>
          </View>
        ),
      },
      {
        key: 2,
        value: (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/largeCategory/img1.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text>{smallCategoryDict[2]}</Text>
          </View>
        ),
      },
    ],
    [
      {
        key: 3,
        value: (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/largeCategory/img0.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text>{smallCategoryDict[3]}</Text>
          </View>
        ),
      },
      {
        key: 4,
        value: (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/largeCategory/img1.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text>{smallCategoryDict[4]}</Text>
          </View>
        ),
      },
    ],
    [
      {
        key: 5,
        value: (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/largeCategory/img0.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text>{smallCategoryDict[5]}</Text>
          </View>
        ),
      },
      {
        key: 6,
        value: (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/largeCategory/img1.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text>{smallCategoryDict[6]}</Text>
          </View>
        ),
      },
    ],
    [
      {
        key: 7,
        value: (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/largeCategory/img0.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text>{smallCategoryDict[7]}</Text>
          </View>
        ),
      },
      {
        key: 8,
        value: (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/largeCategory/img1.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text>{smallCategoryDict[8]}</Text>
          </View>
        ),
      },
    ],
    [
      {
        key: 9,
        value: (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/largeCategory/img0.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text>{smallCategoryDict[9]}</Text>
          </View>
        ),
      },
      {
        key: 10,
        value: (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/largeCategory/img1.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text>{smallCategoryDict[10]}</Text>
          </View>
        ),
      },
    ],
    [
      {
        key: 11,
        value: (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/largeCategory/img0.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text>{smallCategoryDict[11]}</Text>
          </View>
        ),
      },
      {
        key: 12,
        value: (
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/largeCategory/img1.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text>{smallCategoryDict[12]}</Text>
          </View>
        ),
      },
    ],
  ];
  console.log(item, '정보수정 아이템');

  // console.log(smallCategoryData[+selected[0]][+selected[1]], '확인확인');

  const completeButton = () => {
    setModalVisible(!modalVisible);
    ModifiedGifticon({ name, expirationDate, selected });
    refresh();
  };

  const handleLargeCategory = (selectedId) => {
    // console.log(selectedId);
    setSelected([selectedId, 0]);
  };
  const handleSmallCategory = (selectedId) => {
    console.log(selectedId);
    // setSelected([selected[0], selectedId])
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
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
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View>
                <Text style={styles.title}>이름</Text>
                <TextInput
                  defaultValue={item.name}
                  style={styles.input}
                  onChangeText={setName}
                />
              </View>
              <View style={{ flex: 2.3 }}>
                <Text style={styles.title}>유효기간</Text>
                <TextInput
                  defaultValue={item.expirationDate}
                  style={styles.expirationInput}
                  // onChangeText={setExpirationDate}
                />
              </View>
            </View>
            <View style={styles.middle}>
              {/* <View style={{ flex: 1 }} /> */}
              <View style={{ flex: 10, zIndex: 3, marginRight: 5 }}>
                <Text style={styles.title}>대분류</Text>
                <SelectList
                  setSelected={handleLargeCategory}
                  data={largeCategoryData}
                  // onSelect={() => {
                  //   setSelected([selected[0], 0]);
                  //   console.log(selected)
                  // }}
                  dropdownStyles={{
                    backgroundColor: '#fff',
                    position: 'absolute',
                    paddingRight: 10,
                    borderColor: 'red',
                    width: '117%',
                  }}
                  placeholder="카테고리"
                  boxStyles={{
                    width: '117%',
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: 'red',
                  }}
                  defaultOption={largeCategoryData[+selected[0]] || false}
                />
              </View>
              <View style={{ flex: 9, zIndex: 3, paddingLeft: 20 }}>
                <Text style={styles.title}>소분류</Text>
                <SelectList
                  setSelected={handleSmallCategory}
                  // onSelect={(val) => setSmallCategory(val)}
                  data={smallCategoryData[selected[1]]}
                  disabledItemStyles={{
                    backgroundColor: 'red',
                  }}
                  dropdownStyles={{
                    backgroundColor: '#fff',
                    position: 'absolute',
                    borderColor: 'red',
                    padding: -5,
                  }}
                  placeholder="소분류"
                  boxStyles={{
                    borderColor: 'red',
                    borderRadius: 5,
                    borderWidth: 2,
                    paddingLeft: -50,
                  }}
                  // defaultOption={smallCategoryData[+selected[0]][+selected[1]] || false}
                />
              </View>
            </View>

            <CustomImage
              source={API_URL + 'image/brand?path=' + item.brandImgPath}
              style={styles.couponImage}
            />
            <TouchableOpacity
              style={styles.completeButton}
              onPress={completeButton}
            >
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
    // justifyContent: 'space-between',
    marginTop: '5%',
    width: '110%',
    // borderWidth: 1,
  },
  input: {
    // width: '50%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
    padding: 4,
    paddingLeft: 12,
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
  },
  couponImage: {
    width: '80%',
    alignSelf: 'center',
    height: 210,
    marginTop: '10%',
    resizeMode: 'stretch',
    zIndex: 1,
  },
  completeButton: {
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
});
