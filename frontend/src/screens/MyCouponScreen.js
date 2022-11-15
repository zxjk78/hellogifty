import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyTicketScreen from './MyTicketScreen';
import { Title } from 'react-native-paper';
import { fetchMyGifticonList } from '../api/gifticon';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AddTicketModal } from '../components/ticket';

import { requestReadMMSPermission } from '../utils/getPermission';
import { getAllMMSAfterAccess } from '../utils/mmsGifticonFunc';
import { dummySendMMSImage } from '../api/mms';
import AddGifticonFromFileModal from '../components/ticket/AddGifticonFromFileModal';

const TopTab = createMaterialTopTabNavigator();

const MyCouponScreen = () => {
  const [possession, setPossession] = useState([]);
  const [used, setUsed] = useState([]);
  const [selling, setSelling] = useState([]);
  const [mmsReading, setMmsReading] = useState(false);
  const [mmsGifticonArr, setMmsGifticonArr] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isAddGifticonFileMoadlOpen, setIsAddGifticonFileMoadlOpen] = useState(false);



  // const mmsDummyData =

  // api로 데이터 받아와서 정렬
  useEffect(() => {
    const possessionList = [];
    const usedList = [];
    const sellingList = [];

    (async () => {
      const items = await fetchMyGifticonList();
      items.forEach((item) => {
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
    console.log('다시 실행~~ refresh~~~~~~~');
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
            // console.log('찾은 mms 사진 개수: ', imgArr.length);

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
      <AddGifticonFromFileModal
        visible={isAddGifticonFileMoadlOpen}
        onClose={() => setIsAddGifticonFileMoadlOpen(false)}
      />

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
              refresh={handleRefresh}
              type={0}
              existMMSReadBar
              onFileModalOpen={() => setIsAddGifticonFileMoadlOpen(true)}
            />
          )}
        </TopTab.Screen>
        <TopTab.Screen name="사용 완료">
          {(props) => <MyTicketScreen {...props} extraData={used} type={1} />}
        </TopTab.Screen>
        <TopTab.Screen name="판매중">
          {(props) => (
            <MyTicketScreen {...props} extraData={selling} type={2} />
          )}
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
