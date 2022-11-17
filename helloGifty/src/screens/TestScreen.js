import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {logout} from '../api/auth';
import CustomImage from '../components/UI/CustomImage';
import EvaluationModal from '../components/evaluation/EvaluationModal';
const TestScreen = () => {
  const [m, showModal] = useState(false);
  return (
    <View>
      <EvaluationModal
        visible={m}
        buyerId={1}
        sellerId={2}
        userId={3}
        tradeId={4}
        onSubmit={() => {
          console.log('평가완료');
        }}
      />
      <Text>TestScreen</Text>
      <CustomImage source={'123'} />
      <Button
        mode="contained"
        onPress={async () => {
          const res = await logout();
        }}>
        로그아웃
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          showModal(true);
        }}>
        모달창띄위기
      </Button>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
