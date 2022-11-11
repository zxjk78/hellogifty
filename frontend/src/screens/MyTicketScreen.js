import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TicketListItem } from "../components/ticket";
import { ReadMMSComponent } from "../components/readmms";
import ReadMMSStatusBar from "../components/readmms/ReadMMSStatusBar";

const MyTicketScreen = ({
  route,
  extraData,
  findMmsImages,
  handleOpenModal,
  isMMSReading,
  refresh,
  existMMSReadBar,
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
          <View style={{backgroundColor: '#59cd90'}}>
            <Text style={styles.categoryText}>카페</Text>
          </View>
          {dataList[0].map((item) => (
            <TicketListItem key={item.id} item={item} refresh={refresh} />
          ))}
          <View style={{backgroundColor: '#9d4edd'}}>
            <Text style={styles.categoryText}>편의점</Text>
          </View>
          {dataList[1].map((item) => (
            <TicketListItem key={item.id} item={item} refresh={refresh} />
          ))}
          <View style={{backgroundColor: '#e9c46a'}}>
            <Text style={styles.categoryText}>베이커리</Text>
          </View>
          {dataList[2].map((item) => (
            <TicketListItem key={item.id} item={item} refresh={refresh} />
          ))}
          <View style={{backgroundColor: '#ee6352'}}>
            <Text style={styles.categoryText}>아이스크림</Text>
          </View>
          {dataList[3].map((item) => (
            <TicketListItem key={item.id} item={item} refresh={refresh} />
          ))}
          <View style={{backgroundColor: '#3099c0'}}>
            <Text style={styles.categoryText}>외식/프렌차이즈</Text>
          </View>
          {dataList[4].map((item) => (
            <TicketListItem key={item.id} item={item} refresh={refresh} />
          ))}
          <View style={{backgroundColor: '#d4cbb3'}}>
            <Text style={styles.categoryText}>상품권</Text>
          </View>
          {dataList[5].map((item) => (
            <TicketListItem key={item.id} item={item} refresh={refresh} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MyTicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryText: {
    height: 40,
    alignItems: "center",
    alignContent: "center",
    // textAlign: 'center',
    fontSize: 20,
    marginLeft: 10,
  },
  // listItem: {backgroundColor:'red', height:50},
});
