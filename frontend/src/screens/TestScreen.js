import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Modal } from 'react-native';

import { getAllMMSAfterAccess } from '../utils/mmsFunc';
import { requestReadMMSPermission } from '../utils/getPermission';
import { ReadMMSStatusBar } from '../components/readmms';

import { AddTicketModal } from '../components/ticket';
const TestScreen = () => {
  const [imgList, setImgList] = useState([]);
  const [gifticonData, setGifticonData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // useEffect(() => {}, []);

  const handlePress = (data) => {
    setGifticonData(() => data);
    setIsModalVisible(() => true);
  };
  const handleClose = () => {
    console.log('close');
  };
  return (
    <View>
      <AddTicketModal
        gifticonList={gifticonData}
        visible={isModalVisible}
        handleClose={() => {
          setIsModalVisible(() => false);
        }}
      />
      <ReadMMSStatusBar onPress={handlePress} />
      <Text></Text>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
