import { View, StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TicketListItem } from '../components/ticket';
import { ReadMMSComponent } from '../components/readmms';
const MyTicketScreen = ({ route, extraData }) => {
  const data = extraData;
  const renderItem = ({ item }) => <TicketListItem item={item} />;

  return (
    <>
      <ReadMMSComponent />
      <SafeAreaView style={styles.container}>
        <Text>편의점</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.listItem}
        />
        <Text>카페</Text>
      </SafeAreaView>
    </>
  );
};

export default MyTicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // listItem: {backgroundColor:'red', height:50},
});
