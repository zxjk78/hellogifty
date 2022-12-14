import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TicketListItem} from '../components/ticket';
import ReadMMSStatusBar from '../components/readmms/ReadMMSStatusBar';
import {SimpleAccordion} from 'react-native-simple-accordion';
import {Button} from 'react-native-paper';

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
  isRefresh,
}) => {
  const [dataList, setDataList] = useState([[], [], [], [], [], []]);
  const data = extraData;

  useEffect(() => {
    const array = [[], [], [], [], [], []];
    data.map(item => {
      array[item.largeCategoryId].push(item);
    });
    setDataList(array);
  }, [data, extraData]);

  const cafe = (
    <View>
      {dataList[0].map(item => (
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
      {dataList[1].map(item => (
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
      {dataList[2].map(item => (
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
      {dataList[3].map(item => (
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
      {dataList[4].map(item => (
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
      {dataList[5].map(item => (
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
  //   console.log('????????? ?????????~~')
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
          isRefresh={isRefresh}
        />
      )}
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <SimpleAccordion
            viewInside={cafe}
            title={'??????'}
            titleStyle={{
              fontStyle: 'bold',
              color: '#FFFFFF',
              fontSize: 20,
              marginTop: -10,
              marginBottom: -10,
            }}
            bannerStyle={{backgroundColor: '#59cd90', height: 40}}
            viewContainerStyle={{padding: 0, margin: 0}}
            showContentInsideOfCard={false}
            startCollapsed={false}
          />
          <SimpleAccordion
            viewInside={convenience}
            title={'?????????'}
            titleStyle={{
              fontStyle: 'bold',
              color: '#FFFFFF',
              fontSize: 20,
              marginTop: -10,
              marginBottom: -10,
            }}
            bannerStyle={{backgroundColor: '#9d4edd', height: 40}}
            viewContainerStyle={{padding: 0, margin: 0}}
            showContentInsideOfCard={false}
            startCollapsed={false}
          />
          <SimpleAccordion
            viewInside={bakery}
            title={'????????????'}
            titleStyle={{
              fontStyle: 'bold',
              color: '#FFFFFF',
              fontSize: 20,
              marginTop: -10,
              marginBottom: -10,
            }}
            bannerStyle={{backgroundColor: '#e9c46a', height: 40}}
            viewContainerStyle={{padding: 0, margin: 0}}
            showContentInsideOfCard={false}
            startCollapsed={false}
          />
          <SimpleAccordion
            viewInside={icecream}
            title={'???????????????'}
            titleStyle={{
              fontStyle: 'bold',
              color: '#FFFFFF',
              fontSize: 20,
              marginTop: -10,
              marginBottom: -10,
            }}
            bannerStyle={{backgroundColor: '#ee6352', height: 40}}
            viewContainerStyle={{padding: 0, margin: 0}}
            showContentInsideOfCard={false}
            startCollapsed={false}
          />
          <SimpleAccordion
            viewInside={franchise}
            title={'??????/???????????????'}
            titleStyle={{
              fontStyle: 'bold',
              color: '#FFFFFF',
              fontSize: 20,
              marginTop: -10,
              marginBottom: -10,
            }}
            bannerStyle={{backgroundColor: '#3099c0', height: 40}}
            viewContainerStyle={{padding: 0, margin: 0}}
            showContentInsideOfCard={false}
            startCollapsed={false}
          />
          <SimpleAccordion
            viewInside={certificate}
            title={'?????????'}
            titleStyle={{
              fontStyle: 'bold',
              color: '#FFFFFF',
              fontSize: 20,
              marginTop: -10,
              marginBottom: -10,
            }}
            bannerStyle={{backgroundColor: '#d4cbb3', height: 40}}
            viewContainerStyle={{padding: 0, margin: 0}}
            showContentInsideOfCard={false}
            startCollapsed={false}
          />
        </ScrollView>
        <Button style={styles.addButton} onPress={onFileModalOpen}>
          <Text style={{color: '#fff', fontSize: 20}}>+</Text>
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
    bottom: 20,
    right: 20,
  },
});
