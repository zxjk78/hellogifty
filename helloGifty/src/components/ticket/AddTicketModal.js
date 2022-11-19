import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import AddGifticonFirstCheck from './AddGifticonFirstCheck';
import AddGifticonForm from './AddGifticonForm';
import AddGifticonLastCheck from './AddGifticonLastCheck';
import {GlobalStyles} from '../../constants/style';

const AddTicketModal = ({gifticonList, visible, handleClose}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selectedGifticonList, setSelectedGifticonList] = useState(null);

  const handleLgCtChange = (idx, newLgId) => {
    const copyList = selectedGifticonList.slice();
    copyList[idx].largeCategoryId = newLgId;
    setSelectedGifticonList(copyList);
  };
  const handleSmCtChange = (idx, newSmId) => {
    // console.log('소분류명', newSmId, idx);
    const copyList = selectedGifticonList.slice();
    copyList[idx].categoryId = newSmId;
    setSelectedGifticonList(copyList);
  };
  const handleNameChange = (idx, newName) => {
    const copyList = selectedGifticonList.slice();
    copyList[idx].name = newName;
    setSelectedGifticonList(copyList);
  };

  const handleNext = () => {
    setCurrent(prev => prev + 1);
  };

  const handlePrev = (idx, data) => {
    if (current > 0) {
      setCurrent(prev => prev - 1);
    }
  };
  const setSelectedItem = selectedArr => {
    setSelectedGifticonList(
      gifticonList.filter(item => !selectedArr.includes(item.id)),
    );
    setCurrent(prev => prev + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    if (gifticonList) {
      setSelectedGifticonList(() => gifticonList.map((item, index) => item));
    }
    setIsLoading(false);
  }, [gifticonList]);

  const handleSubmitItemDelete = idx => {
    setSelectedGifticonList(prev =>
      prev.filter((item, index) => index !== idx),
    );
  };

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            {selectedGifticonList && (
              <Text style={styles.title}>
                {current === 0
                  ? '기프티콘 선별'
                  : current <= selectedGifticonList.length
                  ? `기프티콘 등록 (${current} / ${selectedGifticonList.length})`
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
            selectedGifticonList &&
            (current === 0 ? (
              <AddGifticonFirstCheck
                imageStringArr={gifticonList}
                onClose={handleClose}
                onSubmit={setSelectedItem}
              />
            ) : current > selectedGifticonList.length ? (
              <AddGifticonLastCheck
                onPrev={handlePrev}
                gifticonArr={selectedGifticonList}
                onSubmitItemDelete={handleSubmitItemDelete}
                onSubmit={handleClose}
              />
            ) : (
              <AddGifticonForm
                gifticon={selectedGifticonList[current - 1]}
                idx={current - 1}
                isEnd={current + 1 > selectedGifticonList.length}
                onNext={handleNext}
                onPrev={handlePrev}
                onLgCtChange={handleLgCtChange}
                onNameChange={handleNameChange}
                onSmCtChange={handleSmCtChange}
              />
            ))}
        </View>
      </View>
    </Modal>
  );
};

export default AddTicketModal;

const styles = StyleSheet.create({
  container: {flex: 1},
  headerContainer: {
    backgroundColor: GlobalStyles.colors.backgroundPrimary,
    justifyContent: 'center',
    flex: 0.7,
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
