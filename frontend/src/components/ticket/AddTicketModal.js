import { StyleSheet, Text, View } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import React from 'react';

const AddTicketModal = () => {
  return (
    <View>
      <View>
        <Text>기프티콘 등록</Text>
        <AntDesignIcon name={'close'} size={30} color={'#000'} />
      </View>
    </View>
  );
};

export default AddTicketModal;

const styles = StyleSheet.create({
  container: {
    flex: 5,
  },
  header: {
    flex: 1,
    width: '80%',
    margin: '0px auto',
    justifyContent: 'space-between',
  },
  main: {
    flex: 3,
  },
  footer: {
    flex: 1,
  },
});
