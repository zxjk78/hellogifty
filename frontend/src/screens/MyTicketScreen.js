import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TicketListItem } from '../components/ticket';
const MyTicketScreen = () => {
  // useEffect(() => {
  //   (async () => {
  //     console.log(await requestReadMMSPermission());
  //     const uri = await convertImageUri();
  //     console.log('uri: ', uri);
  //     setImgTmp(uri);
  //   })();
  // }, []);
  return (
    <View>
      <Text>MyTicketScreen</Text>
      <TicketListItem />
    </View>
  );
};

export default MyTicketScreen;

const styles = StyleSheet.create({});
