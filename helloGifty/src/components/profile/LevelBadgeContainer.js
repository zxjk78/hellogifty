import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProgressBar} from 'react-native-paper';
import {GlobalStyles} from '../../constants/style';
const badgeArr = [
  // require('../../assets/level/Bronze.png'),
  require('../../assets/level/Silver.png'),
  require('../../assets/level/Gold.png'),
  require('../../assets/level/Platinum.png'),
  require('../../assets/level/Master.png'),
];

const LevelBadgeContainer = ({level, isOther}) => {
  const expArr = [50, 120, 150, 200];
  const [isLoading, setIsLoading] = useState(true);
  const [nxtLevelIdx, setNxtLevelIdx] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateBadge = level => {
    // 현재 레벨 다음의 수 찾기
    const expList = [50, 120, 150, 200];

    const nxtExpIdx = expList.reduce((acc, exp, index, _arr) => {
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
  }, [calculateBadge, level]);
  return (
    <View style={{width: '100%'}}>
      {!isLoading && (
        <>
          {!isOther && (
            <Text
              style={{
                fontWeight: 'bold',
                color: '#1c1c1c',
              }}>
              현재 나의 점수는{' '}
              <Text style={{color: GlobalStyles.colors.mainPrimary}}>
                {level}점
              </Text>{' '}
              이에요
            </Text>
          )}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image
              source={
                badgeArr[nxtLevelIdx - 1] ||
                require('../../assets/level/Bronze.png')
              }
              style={{width: 70, height: 70}}
            />
            <Image
              source={badgeArr[nxtLevelIdx]}
              style={{width: 70, height: 70}}
            />
          </View>
          <ProgressBar
            progress={
              (level - (expArr[nxtLevelIdx - 1] || 0) + 0.1) /
              (expArr[nxtLevelIdx] - (expArr[nxtLevelIdx - 1] || 0))
            }
            style={{
              height: 10,
              width: '90%',
              alignSelf: 'center',
            }}
            color={GlobalStyles.colors.mainPrimary}
          />
          <Text style={{marginTop: 10, alignSelf: 'flex-end', marginRight: 10}}>
            {!isOther &&
              `다음 등급까지 앞으로 ${expArr[nxtLevelIdx] - level}점 남았어요`}
          </Text>
        </>
      )}
    </View>
  );
};

export default LevelBadgeContainer;

const styles = StyleSheet.create({});
