import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';

import AddGifticonForm from './AddGifticonForm';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { GlobalStyles } from '../../constants/style';

const AddTicketModal = ({ gifticonList, visible, handleClose }) => {
  const [current, setCurrent] = useState(0);
  const [gifticonCopy, setGifticonCopy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setGifticonCopy(() => JSON.parse(JSON.stringify(gifticonList)));
    setIsLoading(false);
  }, [gifticonList]);
  const handleSubmit = () => {
    console.log('제출하려고합니다.');
  };
  const nextHandler = (idx, data) => {
    if (current === gifticonList.length - 1) {
      handleSubmit();
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {`기프티콘 등록 (${current + 1} / ${gifticonList?.length})`}
            </Text>
            <AntDesignIcon
              name={'close'}
              size={30}
              color={'#000'}
              onPress={handleClose}
            />
          </View>
        </View>
        <View style={styles.main}>
          {!isLoading && gifticonCopy && (
            <AddGifticonForm
              gifticon={gifticonCopy?.[current]}
              idx={current}
              isEnd={current == gifticonList.length - 1}
              handleNext={nextHandler}
              handlePrev={() => {
                if (current === 0) {
                  return;
                } else {
                  setCurrent((prev) => prev - 1);
                }
              }}
            />
          )}
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
