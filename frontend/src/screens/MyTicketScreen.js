import { View, StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TicketListItem } from '../components/ticket';

const MyTicketScreen = ({ route, extraData }) => {
  const data = extraData
  const renderItem = ({ item }) => <TicketListItem item={item} />;
  
  // useEffect(() => {
  //   console.log('데이터 받아요~~')
  //   console.log(route.params)
  //   setData([route.params])
  // }, [route])
  

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>MyTicketScreen</Text> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.listItem}
      />
    </SafeAreaView>
  );
};

export default MyTicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // listItem: {backgroundColor:'red', height:50},
});
