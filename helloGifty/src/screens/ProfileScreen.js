import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {Button, IconButton} from 'react-native-paper';
import {GlobalStyles} from '../constants/style';
import {logout} from '../api/auth';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {fetchMyInfo, fetchUserInfo} from '../api/profile';
import LevelBadgeContainer from '../components/profile/LevelBadgeContainer';
import {List} from 'react-native-paper';
import CustomImage from '../components/UI/CustomImage';
import {API_URL} from '../api/config/http-config';
import {AddComma} from '../utils/regexp';
import ReportModal from '../components/evaluation/ReportModal';
const ProfileScreen = ({}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isOther, setIsOther] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [reportTargetUserId, setReportTargetUserId] = useState(null);
  const [reportTargetTradeId, setReportTargetTradeId] = useState(-1);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const userId = await AsyncStorage.getItem('userId');
      // 다른 유저 프로파일 클릭으로 타고 들어온거면 타인 프로필, 내 탭 클릭해서 들어오면 내 탭 프로필
      // 존재하고, 다를 때만 타인 정보 가지고오기
      if (route.params?.userId && route.params?.userId !== userId) {
        setIsOther(true);
        const otherInfo = await fetchUserInfo(route.params?.userId);
        setUserInfo(otherInfo);
      } else {
        setIsOther(false);

        const myInfo = await fetchMyInfo();
        setUserInfo(myInfo);
      }
    })();
    setIsLoading(false);
  }, [route.params?.userId]);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Auth', {
      screen: 'Login',
      params: {message: '로그아웃'},
    });
  };
  return (
    <View style={styles.wrapper}>
      {!isLoading && userInfo && (
        <>
          {reportTargetUserId && (
            <ReportModal
              visible={isReportModalVisible}
              oppoId={reportTargetUserId}
              tradeId={reportTargetTradeId}
              onClose={() => setIsReportModalVisible(false)}
            />
          )}
          <View style={styles.profileContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                source={require('../assets/Logo.png')}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 40,
                  marginRight: 10,
                }}
                onError={e => {
                  console.log('에러');
                }}
              />
              <Text style={{fontSize: 20}}>
                {userInfo.name || userInfo.id + '번 유저'}
              </Text>
            </View>
            {!isOther && (
              <Button
                mode="contained"
                onPress={handleLogout}
                buttonColor={GlobalStyles.colors.mainPrimary}>
                로그아웃
              </Button>
            )}
          </View>
          <View style={styles.scoreContainer}>
            <LevelBadgeContainer
              level={userInfo.evalScore || 0}
              isOther={isOther}
            />
          </View>
          <ScrollView style={styles.ticketContainer}>
            <View style={styles.ticketList}>
              <List.Section>
                {!isOther && userInfo?.purchaseRecord && (
                  <List.Accordion
                    title={`구매한 기프티콘 ${userInfo.purchaseRecord.length}`}
                    id="2"
                    style={[{...GlobalStyles.shadow}, {marginBottom: 20}]}
                    titleStyle={{color: '#1c1c1c'}}>
                    {userInfo.purchaseRecord.map(record => (
                      <List.Item
                        key={record.tradePostId + 2}
                        title={record.title}
                        description={
                          record.gifticonInfo.expirationDate + ' 까지'
                        }
                        onPress={() =>
                          navigation.navigate('MyCoupon', {
                            screen: 'DetailScreen',
                            params: {
                              item: {id: record.gifticonInfo.gifticonId},
                            },
                          })
                        }
                        left={() => (
                          <CustomImage
                            source={
                              API_URL +
                              'image/gifticon-cropped?path=' +
                              record.image
                            }
                            style={{width: 40, height: 40}}
                          />
                        )}
                        right={() => (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <IconButton
                              icon="account"
                              iconColor={GlobalStyles.colors.mainPrimary}
                              size={30}
                              onPress={() =>
                                navigation.push('ProfileScreen', {
                                  userId: record.sellerId,
                                })
                              }
                            />
                            <IconButton
                              icon="alarm-light"
                              iconColor={'red'}
                              size={30}
                              onPress={() => {
                                setReportTargetUserId(record.sellerId);
                                setReportTargetTradeId(record.tradePostId);
                                setIsReportModalVisible(true);
                              }}
                            />
                          </View>
                        )}
                      />
                    ))}
                  </List.Accordion>
                )}
                <List.Accordion
                  title={`판매한 기프티콘 ${userInfo.salesRecord.length}`}
                  id="1"
                  style={GlobalStyles.shadow}
                  titleStyle={{color: '#1c1c1c'}}>
                  {userInfo.salesRecord.map(record => (
                    <List.Item
                      key={record.tradePostId + 1}
                      title={record.title}
                      description={AddComma(+record.price) + ' 원'}
                      left={() => (
                        <CustomImage
                          source={
                            API_URL +
                            'image/gifticon-cropped?path=' +
                            record.image
                          }
                          style={{width: 40, height: 40}}
                        />
                      )}
                    />
                  ))}
                </List.Accordion>
              </List.Section>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    padding: '5%',
    backgroundColor: '#fff',
  },
  profileContainer: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10%',
  },
  ticketBrief: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    paddingBottom: 0,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  ticketContainer: {
    height: '50%',
    // backgroundColor: 'red',
    // flexDirection: 'row',
  },
  scoreContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: '10%',
  },
});
