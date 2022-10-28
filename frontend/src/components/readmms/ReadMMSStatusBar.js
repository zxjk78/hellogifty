import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { requestReadMMSPermission } from '../../utils/getPermission';
import { GlobalStyles } from '../../constants/style';
import { getAllMMSAfterAccess } from '../../utils/mmsFunc';
import { dummySendMMSImage } from '../../api/mms';
const gColor = GlobalStyles.colors;

const ReadMMSStatusBar = () => {
  const [isReading, setIsReading] = useState(false);
  const n = 0;
  const [byteArr, setByteArr] = useState(null);
  const [imgArr, setImgArr] = useState(0);
  useEffect(() => {
    requestReadMMSPermission();
    setIsReading(true);
    setTimeout(() => {
      (async () => {
        const tmp = await getAllMMSAfterAccess(0, (imgArr) => {
          console.log(imgArr.length);
          setByteArr(imgArr);
        });
      })();
    }, 1000);
  }, []);

  useEffect(() => {
    if (byteArr === null) return;
    (async () => {
      const imageResult = await dummySendMMSImage(byteArr);
      setImgArr(imageResult);
    })();
    setIsReading(false);
  }, [byteArr]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>
          {isReading
            ? '메세지함에서 기프티콘을 찾고 있어요'
            : `총 ${imgArr.length}건의 기프티콘을 찾았어요! 등록하러 가기`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: gColor.backgroundComponent,
    // backgroundColor: 'red',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ReadMMSStatusBar;
