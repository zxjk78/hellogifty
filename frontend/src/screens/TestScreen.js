import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { getAllMMSAfterAccess } from '../utils/mmsFunc';
import { requestReadMMSPermission } from '../utils/getPermission';
import { ReadMMSStatusBar } from '../components/readmms';
const TestScreen = () => {
  const [imgList, setImgList] = useState([]);
  useEffect(() => {}, []);

  return (
    <View>
      <ReadMMSStatusBar />
      <Text>TestScreen123</Text>
      {imgList.map((item, index) => (
        <Image
          style={{
            width: 100,
            height: 100,
            borderWidth: 1,
            borderColor: 'red',
          }}
          source={{ uri: `data:image/jpeg;base64,${item}` }}
          key={index}
        />
      ))}
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
