import { StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import { GlobalStyles } from '../../constants/style';

// /trade/{id}/evaluation/user/{userId} id: tradePostId, userId: 상대방 id
const EvaluationModal = ({ userId, buyerId, sellerId }) => {
  const oppoId = userId == buyerId ? sellerId : buyerId;

  return (
    <Modal animationType="slide">
      <View>
        <Text
          style={{
            color: GlobalStyles.colors.mainPrimary,
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          {oppoId === buyerId ? '구매자' : '판매자'} 평가하기
        </Text>
        <Text>얼마나 친절했는지 점수를 매겨 주세요.</Text>

        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
    </Modal>
  );
};

export default EvaluationModal;

const styles = StyleSheet.create({});
