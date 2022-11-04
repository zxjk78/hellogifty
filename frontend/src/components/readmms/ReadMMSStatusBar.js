import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { requestReadMMSPermission } from '../../utils/getPermission';
import { GlobalStyles } from '../../constants/style';
import { getAllMMSAfterAccess } from '../../utils/mmsFunc';
import { dummySendMMSImage } from '../../api/mms';
import { TransparentButton } from '../UI';

const ReadMMSStatusBar = ({ onPress }) => {
  const [isReading, setIsReading] = useState(false);
  const n = 0;
  const [byteArr, setByteArr] = useState(null);
  const [imgArr, setImgArr] = useState(0);

  useEffect(() => {
    requestReadMMSPermission();
    setIsReading(true);
    setTimeout(() => {
      (async () => {
        const tmp = await getAllMMSAfterAccess(1000, (imgArr) => {
          console.log('찾은 건수', imgArr.length);
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


  const animate = isReading ? {
    borderWidth: 2,
    borderColor: 'red'
  } : null

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{...styles.text, ...animate}}>
          {isReading
            ? '메세지함에서 기프티콘을 찾고 있어요'
            : `총 ${imgArr.length}건의 기프티콘을 찾았어요!`}
        </Text>
        {!isReading && (
          <TransparentButton
            onPress={onPress.bind(this, imgArr)}
            text={`  등록하기`}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.backgroundComponent,
    // backgroundColor: 'red',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
 
  },
  content: {
    flexDirection: 'row',
  },
  text: {
    color: 'black'
  }
});

export default ReadMMSStatusBar;
