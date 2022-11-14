import { StyleSheet, Text, View, Modal, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';

import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const AddGifticonFromFileModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [fileBase64, setFileBase64] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

  const selectImageFromFile = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      includeBase64: true,
    };
    const result = await launchImageLibrary(options);

    console.log(Object.keys(result.assets[0]));
    // console.log(result.assets[0].base64);
    // base64로 들어옴

    setFileBase64(result.assets[0].base64);
  };

  return (
    <Modal animationType="slide">
      <Text>파일에서 기프티콘 추가하기</Text>

      <Button onPress={onClose}>닫기</Button>
      <TextInput
        label="이름"
        value={name}
        mode="outlined"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="기프티콘 번호"
        value={expirationDate}
        mode="outlined"
        onChangeText={(text) => setNumber(expirationDate)}
      />
      <TextInput
        label="유효기간"
        value={number}
        mode="outlined"
        onChangeText={(text) => setNumber(text)}
      />

      <View>
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>

      <View style={styles.imgContainer}>
        <Text>쿠폰 이미지</Text>
        <Pressable onPress={selectImageFromFile}>
          {fileBase64.length > 0 ? (
            <Image
              source={{ uri: `data:image/jpeg;base64,${fileBase64}` }}
              style={{ width: 100, height: 100, backgroundColor: '#d3d3d3' }}
            />
          ) : (
            <View style={styles.selectImgeContainer}>
              <Text>이미지를 선택해 주세요</Text>
            </View>
          )}
        </Pressable>
      </View>
    </Modal>
  );
};

export default AddGifticonFromFileModal;

const styles = StyleSheet.create({
  imgContainer: {
    width: 200,
    height: 200,
  },
  selectImgeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderStyle: 'dashed',
    borderWidth: 2,
  },
});
