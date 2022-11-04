import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyTicketScreen from './MyTicketScreen';
import { Title } from 'react-native-paper';
import { fetchMyGifticon } from '../api/gifticon';

const TopTab = createMaterialTopTabNavigator();

const MyCouponScreen = () => {
  const [possession, setPossession] = useState([]);
  const [used, setUsed] = useState([]);
  const [selling, setSelling] = useState([]);

    // api로 데이터 받아오기
    const data = [
      {
        id: 1,
        categoryId: 1,
        name: '아이스커피',
        expirationDate: '2022-10-10',
        isUsed: 0,
        isOnTrade: 0,
        brandName: '스타벅스',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 2,
        categoryId: 1,
        name: '아메리카노',
        expirationDate: '2022-10-15',
        isUsed: 1,
        isOnTrade: 0,
        brandName: '이디야',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 3,
        categoryId: 1,
        name: '카라멜마끼아또',
        expirationDate: '2022-10-20',
        isUsed: 1,
        isOnTrade: 1,
        brandName: 'banatag',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 4,
        categoryId: 5,
        name: '달고나라떼',
        expirationDate: '2022-11-10',
        isUsed: 0,
        isOnTrade: 1,
        brandName: 'mammoth',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 5,
        categoryId: 3,
        name: '코코코아',
        expirationDate: '2022-11-18',
        isUsed: 0,
        isOnTrade: 0,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 523,
        categoryId: 3,
        name: '옛날 커피',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 1,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 51,
        categoryId: 3,
        name: '오늘의 커피',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 0,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 15,
        categoryId: 3,
        name: '코코아',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 1,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 160,
        categoryId: 3,
        name: '핫초코',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 1,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 161,
        categoryId: 3,
        name: '콜드',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 0,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 162,
        categoryId: 3,
        name: '코코아',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 1,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 1603,
        categoryId: 3,
        name: '밀크',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 1,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 1604,
        categoryId: 3,
        name: '코코아',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 1,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 1605,
        categoryId: 3,
        name: '라떼',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 1,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 1606,
        categoryId: 3,
        name: '아이스라떼',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 1,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 1607,
        categoryId: 3,
        name: '코코아',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 1,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 1608,
        categoryId: 3,
        name: '드랍커피',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 1,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 1690,
        categoryId: 3,
        name: '코코아',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 1,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
      {
        id: 1680,
        categoryId: 3,
        name: '마지막',
        expirationDate: '2022-11-15',
        isUsed: 0,
        isOnTrade: 1,
        brandName: 'T&T',
        brandImage: 'https://picsum.photos/700',
      },
    ];


  
  useEffect(() => {
    const possessionList = []
    const usedList = []
    const sellingList = []
    console.log('hehhehe');

    (async () => {
      const items = await fetchMyGifticon();
      console.log('hi')
      console.log(items)
    })();

    data.map((item) => {
      // console.log(item.isUsed)
      if (!item.isUsed) {
        possessionList.push(item)
      } else if (!!item.isUsed) {
        usedList.push(item)
      }
      if (!!item.isOnTrade) {
        sellingList.push(item)
      }
    })
    setPossession(possessionList)
    setUsed(usedList)
    setSelling(sellingList)
  },[])



  

  return (
    <TopTab.Navigator>
      <TopTab.Screen name="보유중">
        {(props) => <MyTicketScreen {...props} extraData={possession} />}
      </TopTab.Screen>
      <TopTab.Screen name="사용 완료">
        {(props) => <MyTicketScreen {...props} extraData={used} />}
      </TopTab.Screen>
      <TopTab.Screen name="판매중">
        {(props) => <MyTicketScreen {...props} extraData={selling} />}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};

export default MyCouponScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
