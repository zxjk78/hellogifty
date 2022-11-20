import {StyleSheet, Text, View, Modal} from 'react-native';
import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import {GlobalStyles} from '../../constants/style';
import {Button} from 'react-native-paper';
import ReportModal from './ReportModal';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {submitUserEvaluation} from '../../api/trade';

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#9ED5C5',
        backgroundColor: '#cef2e7',
        width: '100%',
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#ff686b',
        backgroundColor: '#ffa69e',
        width: '100%',
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
      }}
    />
  ),
  tomatoToast: ({text1, props}) => (
    <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};
const showErrorToast = () => {
  Toast.show({
    type: 'error',
    text1: '이미 평가한 상대입니다.',
    position: 'top',
    visibilityTime: 4000,
    topOffset: 10,
    // onShow: () => {},
    // onHide: () => {},
  });
};
const showConfirmToast = () => {
  Toast.show({
    type: 'success',
    text1: '평가가 완료되었습니다.',
    position: 'top',
    visibilityTime: 4000,
    topOffset: 10,
    // onShow: () => {},
    // onHide: () => {},
  });
};
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

  const handleSubmit = async () => {
    const res = await submitUserEvaluation(tradeId, oppoId, evalScore);
    if (res) {
      showConfirmToast();
    } else {
      showErrorToast();
    }
  };

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
              top: 20,
              right: 20,
              color: GlobalStyles.colors.mainPrimary,
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
              minimumValue={-10}
              maximumValue={10}
              step={1}
              value={0}
              minimumTrackTintColor={GlobalStyles.colors.mainPrimary}
              maximumTrackTintColor="#000000"
              thumbTintColor={GlobalStyles.colors.mainPrimary}
              onValueChange={setEvalScore}
            />
          </View>
          <Button
            mode="contained"
            buttonColor={GlobalStyles.colors.mainPrimary}
            textColor="#fff"
            onPress={handleSubmit}>
            평가완료
          </Button>
          <Button
            onPress={() => {
              setIsReportModalOpen(true);
            }}
            style={{width: '50%', marginTop: 20, marginLeft: '60%'}}
            textColor={GlobalStyles.colors.mainPrimary}>
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
    height: '60%',
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
