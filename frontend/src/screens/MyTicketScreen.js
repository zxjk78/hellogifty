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
import { SimpleAccordion } from 'react-native-simple-accordion';
import { Button } from 'react-native-paper';

const MyTicketScreen = ({
  route,
  extraData,
  findMmsImages,
  handleOpenModal,
  isMMSReading,
  refresh,
  existMMSReadBar,
  type,
  onFileModalOpen,
}) => {
  const [dataList, setDataList] = useState([[], [], [], [], [], []]);
  // const [pressList, setPressList] = useState([true, ])
  const data = extraData;

  useEffect(() => {
    const array = [[], [], [], [], [], []];
    data.map((item) => {
      array[item.categoryId].push(item);
    });
    setDataList(array);
    console.log(array[2]);
  }, [extraData]);

  const cafe = (
    <View>
      {dataList[0].map((item) => (
        <TicketListItem
          key={item.id}
          item={item}
          refresh={refresh}
          type={type}
        />
      ))}
    </View>
  );
  const convenience = (
    <View>
      {dataList[1].map((item) => (
        <TicketListItem
          key={item.id}
          item={item}
          refresh={refresh}
          type={type}
        />
      ))}
    </View>
  );
  const bakery = (
    <View>
      {dataList[2].map((item) => (
        <TicketListItem
          key={item.id}
          item={item}
          refresh={refresh}
          type={type}
        />
      ))}
    </View>
  );
  const icecream = (
    <View>
      {dataList[3].map((item) => (
        <TicketListItem
          key={item.id}
          item={item}
          refresh={refresh}
          type={type}
        />
      ))}
    </View>
  );
  const franchise = (
    <View>
      {dataList[4].map((item) => (
        <TicketListItem
          key={item.id}
          item={item}
          refresh={refresh}
          type={type}
        />
      ))}
    </View>
  );
  const certificate = (
    <View>
      {dataList[5].map((item) => (
        <TicketListItem
          key={item.id}
          item={item}
          refresh={refresh}
          type={type}
        />
      ))}
    </View>
  );
  // useEffect(() => {
  //   console.log('데이터 받아요~~')
  //   console.log(route.params)
  //   setData([route.params])
  // }, [route])

  return (
    <>
      {existMMSReadBar && (
        <ReadMMSStatusBar
          mmsNum={findMmsImages?.length}
          handleOpenModal={handleOpenModal}
          isMMSReading={isMMSReading}
        />
      )}
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <SimpleAccordion
            viewInside={cafe}
            title={'카페'}
            titleStyle={{ fontStyle: 'bold', color: '#FFFFFF', fontSize: 20 }}
            bannerStyle={{ backgroundColor: '#59cd90' }}
            viewContainerStyle={{ padding: 0, margin: 0 }}
            showContentInsideOfCard={false}
            startCollapsed={false}
          />
          <SimpleAccordion
            viewInside={convenience}
            title={'편의점'}
            titleStyle={{ fontStyle: 'bold', color: '#FFFFFF', fontSize: 20 }}
            bannerStyle={{ backgroundColor: '#9d4edd' }}
            viewContainerStyle={{ padding: 0, margin: 0 }}
            showContentInsideOfCard={false}
            startCollapsed={false}
          />
          <SimpleAccordion
            viewInside={bakery}
            title={'베이커리'}
            titleStyle={{ fontStyle: 'bold', color: '#FFFFFF', fontSize: 20 }}
            bannerStyle={{ backgroundColor: '#e9c46a' }}
            viewContainerStyle={{ padding: 0, margin: 0 }}
            showContentInsideOfCard={false}
            startCollapsed={false}
          />
          <SimpleAccordion
            viewInside={icecream}
            title={'아이스크림'}
            titleStyle={{ fontStyle: 'bold', color: '#FFFFFF', fontSize: 20 }}
            bannerStyle={{ backgroundColor: '#ee6352' }}
            viewContainerStyle={{ padding: 0, margin: 0 }}
            showContentInsideOfCard={false}
            startCollapsed={false}
          />
          <SimpleAccordion
            viewInside={franchise}
            title={'외식/프렌차이즈'}
            titleStyle={{ fontStyle: 'bold', color: '#FFFFFF', fontSize: 20 }}
            bannerStyle={{ backgroundColor: '#3099c0' }}
            viewContainerStyle={{ padding: 0, margin: 0 }}
            showContentInsideOfCard={false}
            startCollapsed={false}
          />
          <SimpleAccordion
            viewInside={certificate}
            title={'상품권'}
            titleStyle={{ fontStyle: 'bold', color: '#FFFFFF', fontSize: 20 }}
            bannerStyle={{ backgroundColor: '#d4cbb3' }}
            viewContainerStyle={{ padding: 0, margin: 0 }}
            showContentInsideOfCard={false}
            startCollapsed={false}
          />
        </ScrollView>
        <Button style={styles.addButton} onPress={onFileModalOpen}>
          <Text style={{ color: '#fff', fontSize: 20 }}>+</Text>
        </Button>
      </SafeAreaView>
    </>
  );
};

export default MyTicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  categoryText: {
    height: 40,
    alignItems: 'center',
    alignContent: 'center',
    // textAlign: 'center',
    fontSize: 20,
    marginLeft: 10,
  },
  // listItem: {backgroundColor:'red', height:50},
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
});
