import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { AddGifticon } from '../../api/gifticon';
import AddGifticonFirstCheck from './AddGifticonFirstCheck';
import AddGifticonForm from './AddGifticonForm';
import AddGifticonLastCheck from './AddGifticonLastCheck';
import { GlobalStyles } from '../../constants/style';

const AddTicketModal = ({ gifticonList, visible, handleClose }) => {
  const [current, setCurrent] = useState(0);
  const [gifticonCopy, setGifticonCopy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitingGifticons, setSubmitingGifticons] = useState([]);
  const [fetchedData, setFetchedData] = useState(null);

  // 이전 버튼 누를 때 저장 완료
  const handleNext = (idx, data) => {
    // console.log('인덱스: ', idx, '넘어온 데이터 ', data);

    setFetchedData({ idx, data });

    if (idx === gifticonList.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setCurrent((prev) => prev + 1);
    }
  };
  const handlePrev = (idx, data) => {
    setFetchedData({ idx, data });

    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };
  const setSelectedItem = (selectedArr) => {
    setGifticonCopy(gifticonList.filter((item) => item.id));

    console.log(selectedArr);
    setCurrent((prev) => prev + 1);
  };
  useEffect(() => {
    if (!fetchedData) return;
    const { data, idx } = fetchedData;
    submitingGifticons[idx]
      ? setSubmitingGifticons(() => {
          const tmp = submitingGifticons.slice();
          tmp[idx] = data;
          return tmp;
        })
      : setSubmitingGifticons((prev) => [...prev, data]);
    // console.log(submitingGifticons);
  }, [fetchedData]);

  useEffect(() => {
    setIsLoading(true);
    if (gifticonList) {
      setGifticonCopy(() => gifticonList.map((item, index) => item));
    }
    setIsLoading(false);
  }, [gifticonList]);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            {gifticonCopy && (
              <Text style={styles.title}>
                {current === 0
                  ? '기프티콘 선별'
                  : current <= gifticonCopy.length
                  ? `기프티콘 등록 (${current} / ${gifticonCopy?.length})`
                  : '마지막 확인'}
              </Text>
            )}
            <AntDesignIcon
              name={'close'}
              size={30}
              color={'#000'}
              onPress={handleClose}
            />
          </View>
        </View>
        <View style={styles.main}>
          {!isLoading &&
            gifticonCopy &&
            (current === 0 ? (
              <AddGifticonFirstCheck
                imageStringArr={gifticonList}
                onClose={handleClose}
                onSubmit={setSelectedItem}
              />
            ) : current > gifticonCopy.length ? (
              <AddGifticonLastCheck gifticonArr={submitingGifticons} />
            ) : (
              <AddGifticonForm
                gifticon={submitingGifticons[current] || gifticonCopy[current]}
                idx={current}
                isEnd={current === gifticonCopy.length}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            ))}
        </View>
      </View>
    </Modal>
  );
};

export default AddTicketModal;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    backgroundColor: GlobalStyles.colors.backgroundPrimary,
    justifyContent: 'center',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginLeft: '10%',
  },
  title: {
    fontSize: 20,
    color: GlobalStyles.colors.mainPrimary,
    fontWeight: 'bold',
  },
  main: {
    flex: 7,
  },
  footer: {
    flex: 1,
  },
});
