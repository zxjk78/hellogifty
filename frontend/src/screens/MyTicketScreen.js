import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TicketListItem } from '../components/ticket';
import { ReadMMSComponent } from '../components/readmms';
import ReadMMSStatusBar from '../components/readmms/ReadMMSStatusBar';

const MyTicketScreen = ({
  route,
  extraData,
  findMmsImages,
  handleOpenModal,
  isMMSReading,
  existBar,
}) => {
  const data = extraData;
  const renderItem = ({ item }) => <TicketListItem item={item} />;

  // useEffect(() => {
  //   console.log('데이터 받아요~~')
  //   console.log(route.params)
  //   setData([route.params])
  // }, [route])

  return (
    <>
      {existBar && (
        <ReadMMSStatusBar
          mmsNum={findMmsImages?.length}
          handleOpenModal={handleOpenModal}
          isMMSReading={isMMSReading}
        />
      )}
      <SafeAreaView style={styles.container}>
        {/* <ScrollView> */}
        <Text>편의점</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.listItem}
        />
        <Text>카페</Text>
        {/* <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.listItem}
          /> */}
        {/* </ScrollView> */}
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
