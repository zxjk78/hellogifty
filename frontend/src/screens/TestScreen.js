import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getAllMMSAfterAccess } from '../utils/mmsFunc';
import { requestReadMMSPermission } from '../utils/getPermission';
const TestScreen = () => {
  const [imgList, setImgList] = useState([]);
  useEffect(() => {
    requestReadMMSPermission();
    (async () => {
      const tmp = await getAllMMSAfterAccess(2440, (imgArr) => {
        setImgList(imgArr);
      });
    })();
  }, []);

  return (
    <View>
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
