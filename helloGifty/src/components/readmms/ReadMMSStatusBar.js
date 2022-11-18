import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {requestReadMMSPermission} from '../../utils/getPermission';
import {GlobalStyles} from '../../constants/style';
import {TransparentButton} from '../UI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReadMMSStatusBar = ({mmsNum, handleOpenModal, isMMSReading}) => {
  const [userMmsIndex, setUserMmsIndex] = useState(-1);
  useEffect(() => {
    (async () => {
      const res = await AsyncStorage.getItem('userMmsIndex');
      setUserMmsIndex(res);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {!mmsNum && (
          <View style={{flexDirection: 'row'}}>
            <ActivityIndicator size="large" />
            <Text>
              메세지함에서 기프티콘을 찾고 있어요.
              {!userMmsIndex &&
                '\n로그인을 처음 하셨으면, 오래 걸릴 수 있으니 기다려 주세요'}
            </Text>
          </View>
        )}
        {mmsNum && !isMMSReading && (
          <Text> {`총 ${mmsNum}건의 기프티콘을 찾았어요!`} </Text>
        )}
        {mmsNum && !isMMSReading && (
          <TransparentButton onPress={handleOpenModal} text={`  등록하기`} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.backgroundComponent,
    // backgroundColor: 'red',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
  },
  text: {
    color: 'black',
  },
});

export default ReadMMSStatusBar;
