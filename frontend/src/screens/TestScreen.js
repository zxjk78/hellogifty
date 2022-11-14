import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { AddGifticonFromFile } from '../api/gifticon';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import AddGifticonFromFileModal from '../components/ticket/AddGifticonFromFileModal';

const TestScreen = () => {
  const [gifticonInfo, setGifticonInfo] = useState({
    categoryId: 1,
    expirationDate: '2012-12-12',
    fileBase64: '',
    name: '기프티콘이름',
  });
  const [isAddGifticonFileMoadlOpen, setIsAddGifticonFileMoadlOpen] =
    useState(false);

  const openAddGifticonFromFileModal = () => {
    setIsAddGifticonFileMoadlOpen(true);
  };
  const [imgPath, setImgPath] = useState('');
  useEffect(() => {
    if (imgPath.length === 0) return;
    (async () => {
      const fileBase64 = await RNFS.readFile(imgPath, 'base64');
      setGifticonInfo((prev) => {
        return { ...prev, fileBase64: fileBase64 };
      });
    })();
  }, [imgPath]);

  const addGifticon = async () => {
    const res = await AddGifticonFromFile(gifticonInfo);
    // console.log(res);
  };

  const selectPic = async () => {
    const options = { mediaType: 'photo' };
    const result = await launchImageLibrary(options);
    // console.log(result.assets[0].uri);
    setImgPath(result.assets[0].uri);
  };

  return (
    <View>
      {isAddGifticonFileMoadlOpen && (
        <AddGifticonFromFileModal
          onClose={() => setIsAddGifticonFileMoadlOpen(false)}
        />
      )}

      <Text>TestScreen</Text>
      <Text>제목</Text>
      <TextInput style={{ borderWidth: 2, padding: 10 }} />
      <Text>아이디</Text>
      <TextInput style={{ borderWidth: 2, padding: 10 }} />

      {imgPath?.length > 0 && (
        <Image source={{ uri: imgPath }} style={{ width: 100, height: 100 }} />
      )}
      <Button onPress={selectPic}>기프티콘 파일에서 탐색버튼</Button>

      <Button onPress={addGifticon}>기프티콘 파일에서 추가버튼</Button>

      <Button onPress={openAddGifticonFromFileModal}>모달로 띄우기</Button>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
