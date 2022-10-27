import { View, StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import React from 'react';
import { TicketListItem } from '../components/ticket';

// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );

const MyTicketScreen = () => {

  // {item.map((item) => {
  //   return <TicketListItem item={item} key={item.id}/>
  // })}

  const renderItem = ({ item }) => (
    <TicketListItem item={item} />
  );

  const data = [
    {
      id: 1,
      categoryId: 1,
      name: '아이스커피',
      expirationDate: '2022-10-10',
      isUsed: 0,
      isOnTrade: 1,
      brandName: '스타벅스',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 2,
      categoryId: 1,
      name: '아메리카노',
      expirationDate: '2022-10-15',
      isUsed: 1,
      isOnTrade: 0,
      brandName: '이디야',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 3,
      categoryId: 1,
      name: '카라멜마끼아또',
      expirationDate: '2022-10-20',
      isUsed: 1,
      isOnTrade: 1,
      brandName: 'banatag',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 4,
      categoryId: 5,
      name: '달고나라떼',
      expirationDate: '2022-11-10',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'mammoth',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 5,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 523,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 51,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 15,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 160,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 161,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 162,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 1603,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 1604,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 1605,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 1606,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 1607,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 1608,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 1690,
      categoryId: 3,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
    {
      id: 1680,
      categoryId: 3,
      name: '마지막',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700'
    },
  ]
  // useEffect(() => {
  //   (async () => {
  //     console.log(await requestReadMMSPermission());
  //     const uri = await convertImageUri();
  //     console.log('uri: ', uri);
  //     setImgTmp(uri);
  //   })();
  // }, []);

  return (
    <SafeAreaView  style={styles.container}>
      {/* <Text>MyTicketScreen</Text> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.listItem}
      />
    </SafeAreaView>
  );
};

export default MyTicketScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  // listItem: {backgroundColor:'red', height:50},
});
