import { StyleSheet, Text, View } from 'react-native';

import React, { useEffect, useState } from 'react';
import { TicketList } from '../components/ticket';
import { fetchMyGifticon } from '../api/gifticon';
const TestScreen = () => {
  const [myCouponList, setMyCouponList] = useState(null);
  useEffect(() => {
    console.log('테스트화면');
    (async () => {
      const data = await fetchMyGifticon();
      console.log(data);
      setMyCouponList(data);
    })();
  }, []);

  return (
    <View>
      <Text>TestScreen</Text>
      {myCouponList && <TicketList ticketList={myCouponList} />}
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
