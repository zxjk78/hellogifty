import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyTicketScreen from './MyTicketScreen';
import { Title } from 'react-native-paper';
import { fetchMyGifticon } from '../api/gifticon';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AddTicketModal } from '../components/ticket';

import { requestReadMMSPermission } from '../utils/getPermission';
import { getAllMMSAfterAccess } from '../utils/mmsFunc';
import { dummySendMMSImage } from '../api/mms';

const TopTab = createMaterialTopTabNavigator();

const MyCouponScreen = () => {
  const [possession, setPossession] = useState([]);
  const [used, setUsed] = useState([]);
  const [selling, setSelling] = useState([]);
  const [mmsReading, setMmsReading] = useState(false);
  const [mmsGifticonArr, setMmsGifticonArr] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // api로 데이터 받아오기
  const data = [
    {
      id: 1,
      categoryId: 0,
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
      categoryId: 0,
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
      categoryId: 5,
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
      categoryId: 4,
      name: '콜드',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 0,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700',
    },
    {
      id: 162,
      categoryId: 2,
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
      categoryId: 1,
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
      categoryId: 5,
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
      categoryId: 0,
      name: '코코아',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700',
    },
    {
      id: 1680,
      categoryId: 1,
      name: '마지막',
      expirationDate: '2022-11-15',
      isUsed: 0,
      isOnTrade: 1,
      brandName: 'T&T',
      brandImage: 'https://picsum.photos/700',
    },
  ];

  // const mmsDummyData =

  // api로 데이터 받아와서 정렬
  useEffect(() => {
    const possessionList = [];
    const usedList = [];
    const sellingList = [];

    (async () => {
      const items = await fetchMyGifticon();
      data.forEach((item) => {
        // console.log(item.isUsed)
        if (!item.isUsed) {
          possessionList.push(item);
        } else if (!!item.isUsed) {
          usedList.push(item);
        }
        if (!!item.isOnTrade) {
          sellingList.push(item);
        }
      });

      setPossession(possessionList);
      setUsed(usedList);
      setSelling(sellingList);
    })();
    console.log(refresh, '다시 실행~~');
  }, [refresh]);

  // mms 사진에서 최근의 모든 사진 읽어오는 코드

  useEffect(() => {
    requestReadMMSPermission();
    let lastMMSImageIdx;
    AsyncStorage.getItem('lastMMSImageIdx').then((idx) => {
      lastMMSImageIdx = idx || 0;
      console.log(idx);
    });

    // const lastMMSImageIdx = 0;
    setMmsReading(true);
    setTimeout(() => {
      (async () => {
        const tmp = await getAllMMSAfterAccess(
          lastMMSImageIdx,
          async (imgArr) => {
            console.log('찾은 mms 사진 개수: ', imgArr.length);

            // 사진들을 찾고 서버로 보내서, 기프티콘인 것들의 idx값과, 그 텍스트들의 응답을 받는 코드 필요.
            //
            //
            //

            const result = await dummySendMMSImage(imgArr);
            setMmsGifticonArr(result);
          }
        );
      })();
    }, 1000);

    setMmsReading(false);
  }, []);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <AddTicketModal
        gifticonList={mmsGifticonArr}
        visible={isModalVisible}
        handleClose={() => {
          setIsModalVisible(() => false);
        }}
      />
      <TopTab.Navigator>
        <TopTab.Screen name="보유중">
          {(props) => (
            <MyTicketScreen
              {...props}
              extraData={possession}
              findMmsImages={mmsGifticonArr}
              handleOpenModal={openModal}
              isMMSReading={mmsReading}
              refresh={actionRefresh}
              existMMSReadBar
            />
          )}
        </TopTab.Screen>
        <TopTab.Screen name="사용 완료">
          {(props) => <MyTicketScreen {...props} extraData={used} />}
        </TopTab.Screen>
        <TopTab.Screen name="판매중">
          {(props) => <MyTicketScreen {...props} extraData={selling} />}
        </TopTab.Screen>
      </TopTab.Navigator>
    </>
  );
};

export default MyCouponScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
