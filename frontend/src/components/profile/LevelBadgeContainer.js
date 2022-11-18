import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-native-paper';
import { GlobalStyles } from '../../constants/style';
const badgeArr = [
  // require('../../assets/level/Bronze.png'),
  require('../../assets/level/Silver.png'),
  require('../../assets/level/Gold.png'),
  require('../../assets/level/Platinum.png'),
  require('../../assets/level/Master.png'),
];

const LevelBadgeContainer = ({ level }) => {
  const expArr = [50, 120, 150, 200];
  const [isLoading, setIsLoading] = useState(true);
  const [nxtLevelIdx, setNxtLevelIdx] = useState(0);
  const calculateBadge = (level) => {
    // 현재 레벨 다음의 수 찾기
    const nxtExpIdx = expArr.reduce((acc, exp, index, arr) => {
      if (level < exp && acc === -1) {
        return index;
      } else {
        return acc;
      }
    }, -1);
    return nxtExpIdx;
  };
  useEffect(() => {
    setIsLoading(true);
    const nxtExpIdx = calculateBadge(level);
    setNxtLevelIdx(nxtExpIdx);
    setIsLoading(false);
  }, []);
  return (
    <View style={{ width: '100%' }}>
      {!isLoading && (
        <>
          <Text
            style={{
              fontWeight: 'bold',
              color: GlobalStyles.colors.mainPrimary,
            }}
          >
            현재 나의 점수는{' '}
            <Text style={{ color: GlobalStyles.colors.mainSecondary }}>
              {level}점
            </Text>{' '}
            이에요
          </Text>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Image
              source={
                badgeArr[nxtLevelIdx - 1] ||
                require('../../assets/level/Bronze.png')
              }
              style={{ width: 70, height: 70 }}
            />
            <Image
              source={badgeArr[nxtLevelIdx]}
              style={{ width: 70, height: 70 }}
            />
          </View>
          <ProgressBar
            progress={
              (level - (expArr[nxtLevelIdx - 1] || 0) + 0.1) /
              (expArr[nxtLevelIdx] - (expArr[nxtLevelIdx - 1] || 0))
            }
            style={{ height: 10, width: '90%', alignSelf: 'center' }}
          />
          <Text
            style={{ marginTop: 10, alignSelf: 'flex-end', marginRight: 10 }}
          >
            {`다음 등급까지 앞으로 ${expArr[nxtLevelIdx] - level}점 남았어요`}
          </Text>
        </>
      )}
    </View>
  );
};

export default LevelBadgeContainer;

const styles = StyleSheet.create({});
