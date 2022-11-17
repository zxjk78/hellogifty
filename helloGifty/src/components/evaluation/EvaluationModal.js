import {StyleSheet, Text, View, Modal} from 'react-native';
import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import {GlobalStyles} from '../../constants/style';
import {Button} from 'react-native-paper';
import ReportModal from './ReportModal';
import Icon from 'react-native-vector-icons/AntDesign';

// /trade/{id}/evaluation/user/{userId} id: tradePostId, userId: 상대방 id
const EvaluationModal = ({
  userId,
  buyerId,
  sellerId,
  visible,
  tradeId,
  onSubmit,
  onClose,
}) => {
  const [evalScore, setEvalScore] = useState(10);
  const oppoId = userId == buyerId ? sellerId : buyerId;
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  return (
    <>
      <ReportModal
        oppoId={oppoId}
        tradeId={tradeId}
        visible={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false);
        }}
      />
      <Modal animationType="slide" visible={visible} transparent={true}>
        <View style={styles.container}>
          <Icon
            name="closecircle"
            onPress={onClose}
            style={{
              fontSize: 25,
              position: 'absolute',
              top: 30,
              right: 30,
            }}
          />
          <View style={{flex: 1}}>
            <Text style={styles.header}>
              {oppoId === buyerId ? '구매자' : '판매자'} 평가하기
            </Text>
            <Text style={{fontSize: 15, marginTop: 3}}>
              얼마나 친절했는지 점수를 매겨 주세요.
            </Text>
          </View>
          <View style={styles.slideContainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 30}}>🙁</Text>
              <Text style={{fontSize: 30}}>😄</Text>
            </View>
            <Slider
              style={styles.slide}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={10}
              minimumTrackTintColor={GlobalStyles.colors.mainPrimary}
              maximumTrackTintColor="#000000"
              thumbTintColor="blue"
              onValueChange={setEvalScore}
            />
          </View>
          <Button
            mode="contained"
            onPress={onSubmit.bind(this, tradeId, oppoId, evalScore)}>
            평가완료
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              setIsReportModalOpen(true);
            }}
            style={{width: '50%'}}>
            신고하기
          </Button>
        </View>
      </Modal>
    </>
  );
};

export default EvaluationModal;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '50%',
    alignSelf: 'center',
    marginTop: '30%',
    padding: '10%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  header: {
    color: GlobalStyles.colors.mainPrimary,
    fontSize: 35,
    fontWeight: 'bold',
  },
  slide: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    alignSelf: 'center',
    flex: 1,
  },
  slideContainer: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
  },
});
