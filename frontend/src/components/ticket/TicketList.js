import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TicketListItem from './TicketListItem';
const TicketList = ({ ticketList }) => {
  return (
    <View>
      <Text>TicketList</Text>
      {ticketList.map((item) => (
        <TicketListItem item={item} />
      ))}
    </View>
  );
};

export default TicketList;

const styles = StyleSheet.create({});
