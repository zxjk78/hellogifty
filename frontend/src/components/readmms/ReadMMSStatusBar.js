import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { requestReadMMSPermission } from '../../utils/getPermission';
import { GlobalStyles } from '../../constants/style';
import { dummySendMMSImage } from '../../api/mms';
import { TransparentButton } from '../UI';

const ReadMMSStatusBar = ({ mmsNum, handleOpenModal, isMMSReading }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {!mmsNum && <Text>메세지함에서 기프티콘을 찾고 있어요.</Text>}
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
