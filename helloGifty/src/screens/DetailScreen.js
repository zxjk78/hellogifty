/* eslint-disable no-undef */
import {View, Text, Image, StyleSheet, Pressable, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import CustomImage from '../components/UI/CustomImage';
import {API_URL} from '../api/config/http-config';
import {
  deleteMyGifticon,
  fetchMyGifticonDetail,
  isUsedGifticon,
} from '../api/gifticon';

// 처음 로딩 시 받아오던가 route로 오는것이기 때문에 여기서도 사용할 수 있던가 해야 함
const DetailScreen = ({route}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const gifticonInfo = await fetchMyGifticonDetail(route.params.item.id);
      // console.log(gifticonInfo, 'detail정보');
      setInfo(gifticonInfo);
    })();
    // console.log(route.params.item, 'detail route item 정보');
    setIsLoading(false);
  }, [route.params.item.id]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: `😊 ${info.name} 사용이 완료되었습니다.✔️`,
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
      text1: `${info.name} 를(을) 삭제 하였습니다.`,
      position: 'top',
      visibilityTime: 4000,
      topOffset: 10,
      // onShow: () => {},
      // onHide: () => {},
    });
  };

  const handleImg = () => {
    setImgVisible(!imgVisible);
  };

  const uesd = () => {
    showToast();
    // 사용완료 api 보내고
    isUsedGifticon(route.params.item.id);
    setModalVisible(false);
    navigation.navigate('MyCouponScreen', {detailRefresh: 'Yes'});
  };

  const deleteTicket = async () => {
    showToast2();
    // 삭제 api 보내고
    await deleteMyGifticon(route.params.item.id);
    // route.params.refresh();
    setModalVisible2(!modalVisible2);
    navigation.navigate('MyCouponScreen', {detailRefresh: 'Yes'});
  };

  return (
    <View style={styles.container}>
      {/* Modal */}
      {/* Used */}
      {!isLoading && info && (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {info.name} 를(을) 사용하셨습니까?
                </Text>
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
                    style={[styles.button, styles.buttonOpen]}
                    onPress={uesd}>
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
              Alert.alert('Modal has been closed.');
              setModalVisible2(!modalVisible2);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modaldeleteView}>
                <Text style={styles.modalText}>
                  정말 {info.name} 을(를) 삭제 하시겠습니까?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 150,
                  }}>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible2(!modalVisible2)}>
                    <Text style={styles.textStyle}>아니요</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={deleteTicket}>
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
              Alert.alert('Modal has been closed.');
              setImgVisible(!imgVisible);
            }}>
            <Pressable onPress={handleImg} style={styles.imgModal}>
              <CustomImage
                source={API_URL + 'image/gifticon?path=' + info.img}
                style={styles.imgModal}
              />
            </Pressable>
          </Modal>

          {/* Main */}
          <View style={{flex: 8}}>
            <Pressable onPress={handleImg}>
              <CustomImage
                source={API_URL + 'image/gifticon?path=' + info.img}
                style={styles.img}
              />

              <Text style={{alignSelf: 'center', color: 'grey', fontSize: 15}}>
                이미지를 클릭해 확대할 수 있습니다.
              </Text>
            </Pressable>
            <View style={{marginTop: 30, alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <CustomImage
                  source={
                    API_URL +
                    'image/brand?path=' +
                    route.params.item.brandImgPath
                  }
                  style={{width: 90, height: 90, marginRight: 10}}
                />
                <View>
                  <Text style={{fontSize: 15, color: 'black'}}>
                    {info.brandName}
                  </Text>
                  <Text style={{fontSize: 20, color: 'black'}}>
                    {info.name}
                  </Text>
                  <Text style={{color: 'black'}}>
                    유효기간{' '}
                    <Text style={{fontWeight: 'bold', color: 'black'}}>
                      {info.expirationDate}
                    </Text>{' '}
                    까지
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            {route.params.type == 0 ? (
              <Text style={{fontSize: 18, color: 'black'}}>
                사용 후 <Text style={{color: '#84dcc6'}}>사용 완료</Text> 버튼을
                눌러주세요.
              </Text>
            ) : (
              <Text style={{fontSize: 18, color: 'black'}}>
                삭제 하고 싶다면 <Text style={{color: '#ff686b'}}>삭제</Text>{' '}
                버튼을 눌러주세요.
              </Text>
            )}
          </View>
          <View style={{flex: 1}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable
                style={styles.deleteButton}
                onPress={() => setModalVisible2(true)}
                android_ripple={{color: '#ff686b'}}>
                <Text style={{color: '#ff686b'}}>삭제</Text>
              </Pressable>
              {route.params.type == 0 ? (
                <Pressable
                  style={styles.usedButton}
                  onPress={() => setModalVisible(true)}
                  android_ripple={{color: '#84dcc6'}}>
                  <Text style={{color: 'black'}}>사용 완료</Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    // width: '100%',
    height: 50,
    margin: 5,
    borderWidth: 2,
    borderColor: '#ff686b',
    // backgroundColor: '#ff686b',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usedButton: {
    width: 280,
    height: 50,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#a5ffd6',
    backgroundColor: '#a5ffd6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
    // marginTop: 22
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: '#9ed2cd',
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
  modaldeleteView: {
    margin: 20,
    backgroundColor: '#ffddd2',
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
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    // backgroundColor: '#ffddd2',
  },
  buttonOpen: {
    backgroundColor: '#06d6a0',
  },
  buttonClose: {
    backgroundColor: '#ef476f',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 17,
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
  // imgModal
  imgModal: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  bigImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
