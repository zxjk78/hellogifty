import {StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyTicketScreen from './MyTicketScreen';
import {fetchMyGifticonList, fetchMySellingGifticonList} from '../api/gifticon';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AddTicketModal} from '../components/ticket';

import {requestReadMMSPermission} from '../utils/getPermission';
import {checkImg} from '../utils/mmsGifticonFunc';
import {checkMMSImageValidate} from '../api/mms';
import AddGifticonFromFileModal from '../components/ticket/AddGifticonFromFileModal';
import {sepGifticonNumber} from '../utils/regexp';
import moment from 'moment';
const TopTab = createMaterialTopTabNavigator();

const MyCouponScreen = ({route: params}) => {
  const [possession, setPossession] = useState([]);
  const [used, setUsed] = useState([]);
  const [selling, setSelling] = useState([]);
  const [isMmsReading, setIsMmsReading] = useState(true);
  const [mmsGifticonArr, setMmsGifticonArr] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isAddGifticonFileMoadlOpen, setIsAddGifticonFileMoadlOpen] =
    useState(false);

  // route 통해서 refresh 하기 위한 요상한 로직
  if (params.params !== undefined) {
    console.log('받은 param', params.params);
    setRefresh(!refresh);
    params.params = undefined;
  }

  // const mmsDummyData =

  // api로 데이터 받아와서 정렬
  useEffect(() => {
    const possessionList = [];
    const usedList = [];
    const sellingList = [];

    (async () => {
      const items = await fetchMyGifticonList();
      items.forEach(item => {
        if (!item.isUsed && !item.onTrade) {
          possessionList.push(item);
        } else if (!!item.isUsed) {
          usedList.push(item);
        } else if (!!item.onTrade) {
          sellingList.push(item);
        }
      });
      setPossession(possessionList);
      setUsed(usedList);
      setSelling(sellingList);
    })();
    console.log('다시 실행~~ refresh~~~~~~~');
  }, [refresh]);

  // mms 사진에서 최근의 모든 사진 읽어오는 로직

  useEffect(() => {
    requestReadMMSPermission();
    let lastMMSImageIdx;
    AsyncStorage.getItem('lastMMSImageIdx').then(idx => {
      lastMMSImageIdx = idx || 0;
      console.log('마지막mms의 사진넘버', idx);
    });

    setIsMmsReading(true);
    const findFromMMS = setTimeout(() => {
      (async () => {
        const tmp = await checkImg(lastMMSImageIdx, async imgIdxArr => {
          // console.log('찾은 mms 사진 id 개수: ', imgIdxArr);

          // 사진들을 찾고 서버로 보내서, 기프티콘인 것들의 idx값과, 그 텍스트들의 응답을 받는 코드 필요.
          //
          //
          //

          if (imgIdxArr.length === 0) {
            setMmsGifticonArr([]);

            setIsMmsReading(false);
            return;
          }

          const gifticonArr = [];
          const result = await checkMMSImageValidate(imgIdxArr);
          if (result) {
            console.log('찾은 기프티콘: ', result);
            AsyncStorage.setItem('lastMMSImageIdx', imgIdxArr[0] + '');
          }
          result.forEach(item => {
            const gifticon = {
              ...item,
              number: sepGifticonNumber(item.number),
              expirationDate: item.expirationDate.replace(/\//g, '-'),
              imgPath: 'content://mms/part/' + imgIdxArr[item.idx],
            };
            if (moment(gifticon.expirationDate).isAfter(moment())) {
              gifticonArr.push(gifticon);
            }
          });
          setMmsGifticonArr(gifticonArr);
        });
      })();
    }, 1000);

    setIsMmsReading(false);
    // unMountOnblur시 정지하기
    return () => {
      clearTimeout(findFromMMS);
    };
  }, [refresh]);

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
        onRefresh={() => {
          setRefresh(prev => !prev);
        }}
        onClose={() => setIsAddGifticonFileMoadlOpen(false)}
      />

      <AddTicketModal
        gifticonList={mmsGifticonArr}
        visible={isModalVisible}
        handleClose={isAdded => {
          if (isAdded) {
            setRefresh(prev => !prev);
          }

          setIsModalVisible(() => false);
        }}
      />
      <TopTab.Navigator>
        <TopTab.Screen name="보유중">
          {props => (
            <MyTicketScreen
              {...props}
              extraData={possession}
              findMmsImages={mmsGifticonArr}
              handleOpenModal={openModal}
              isMMSReading={isMmsReading}
              refresh={handleRefresh}
              isRefresh={refresh}
              type={0}
              existMMSReadBar
              onFileModalOpen={() => setIsAddGifticonFileMoadlOpen(true)}
            />
          )}
        </TopTab.Screen>
        <TopTab.Screen name="사용 완료">
          {props => <MyTicketScreen {...props} extraData={used} type={1} />}
        </TopTab.Screen>
        <TopTab.Screen name="판매중">
          {props => <MyTicketScreen {...props} extraData={selling} type={2} />}
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
