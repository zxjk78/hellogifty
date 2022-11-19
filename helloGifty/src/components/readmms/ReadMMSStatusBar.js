import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {GlobalStyles} from '../../constants/style';
import {TransparentButton} from '../UI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';

const ReadMMSStatusBar = ({mmsNum, handleOpenModal, isMMSReading}) => {
  const [userMmsIndex, setUserMmsIndex] = useState(-1);
  useEffect(() => {
    console.log(mmsNum);
    (async () => {
      const res = await AsyncStorage.getItem('userMmsIndex');
      setUserMmsIndex(res);
    })();
  }, [mmsNum]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {mmsNum === undefined && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ActivityIndicator
              size="large"
              color={GlobalStyles.colors.mainPrimary}
            />
            <Text style={{marginLeft: 15}}>
              메세지함에서 기프티콘을 찾고 있어요.
              {userMmsIndex === 0 &&
                '\n로그인을 처음 하셨으면, 오래 걸릴 수 있으니 기다려 주세요'}
            </Text>
          </View>
        )}
        {mmsNum === 0 && !isMMSReading && (
          <View style={{flexDirection: 'row'}}>
            <Text>새로 검색된 기프티콘이 없어요</Text>
          </View>
        )}
        {mmsNum > 0 && !isMMSReading && (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>총 {mmsNum}건의 기프티콘을 찾았어요!</Text>
              <Button
                onPress={handleOpenModal}
                textColor={GlobalStyles.colors.mainPrimary}>
                등록하기
              </Button>
            </View>
          </>
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
