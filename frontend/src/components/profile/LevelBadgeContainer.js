import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-native-paper';
import { GlobalStyles } from '../../constants/style';
const badgeArr = [
  require('../../assets/level/Badge1.png'),
  require('../../assets/level/Badge2.png'),
  require('../../assets/level/Badge3.png'),
  require('../../assets/level/Badge4.png'),
  require('../../assets/level/Badge5.png'),
];

const LevelBadgeContainer = ({ level }) => {
  const expArr = [10, 20, 30, 40, 50];
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
            현재 나의 레벨 {level}
          </Text>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Image
              source={
                badgeArr[nxtLevelIdx - 1] ||
                require('../../assets/level/Badge0.png')
              }
              style={{ width: 50, height: 70 }}
            />
            <Image
              source={badgeArr[nxtLevelIdx]}
              style={{ width: 50, height: 70 }}
            />
          </View>
          <ProgressBar
            progress={
              (level - (expArr[nxtLevelIdx - 1] || 0) + 0.1) /
              (expArr[nxtLevelIdx] - (expArr[nxtLevelIdx - 1] || 0))
            }
            style={{ height: 10 }}
          />
          <Text>다음 레벨까지 앞으로 {expArr[nxtLevelIdx] - level}</Text>
        </>
      )}
    </View>
  );
};

export default LevelBadgeContainer;

const styles = StyleSheet.create({});
