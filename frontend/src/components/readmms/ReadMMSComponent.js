import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Modal } from 'react-native';

import ReadMMSStatusBar from './ReadMMSStatusBar';

import { AddTicketModal } from '../../components/ticket';

const ReadMMSComponent = () => {
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
    <View style={{height:'10%', }}>
      <AddTicketModal
        gifticonList={gifticonData}
        visible={isModalVisible}
        handleClose={() => {
          setIsModalVisible(() => false);
        }}
      />
      <ReadMMSStatusBar onPress={handlePress} />
    </View>
  );
};

export default ReadMMSComponent;

const styles = StyleSheet.create({});
