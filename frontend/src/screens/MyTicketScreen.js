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
  const data = extraData;

  const renderItem = ({ item }) => (
    <TicketListItem item={item} refresh={refresh} />
  );

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
          <Text style={styles.categoryText}>카페</Text>
          {dataList[0].map((item) => (
            <TicketListItem key={item.id} item={item} refresh={refresh} />
          ))}
          <Text style={styles.categoryText}>편의점</Text>
          {dataList[1].map((item) => (
            <TicketListItem key={item.id} item={item} refresh={refresh} />
          ))}
          <Text style={styles.categoryText}>베이커리</Text>
          {dataList[2].map((item) => (
            <TicketListItem key={item.id} item={item} refresh={refresh} />
          ))}
          <Text style={styles.categoryText}>아이스크림</Text>
          {dataList[3].map((item) => (
            <TicketListItem key={item.id} item={item} refresh={refresh} />
          ))}
          <Text style={styles.categoryText}>외식/프렌차이즈</Text>
          {dataList[4].map((item) => (
            <TicketListItem key={item.id} item={item} refresh={refresh} />
          ))}
          <Text style={styles.categoryText}>상품권</Text>
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
    backgroundColor: "#e9c46a",
    height: 40,
    alignItems: "center",
    alignContent: "center",
    // textAlign: 'center',
    fontSize: 20,
  },
  // listItem: {backgroundColor:'red', height:50},
});
