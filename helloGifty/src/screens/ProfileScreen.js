import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {Button, IconButton} from 'react-native-paper';
import {TicketListItem} from '../components/ticket';
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
  const [reportTargetUserId, setReportTargetUserId] = useState(-1);
  const [reportTargetTradeId, setReportTargetTradeId] = useState(-1);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const userId = await AsyncStorage.getItem('userId');
      // 다른 유저 프로파일 클릭으로 타고 들어온거면 타인 프로필, 내 탭 클릭해서 들어오면 내 탭 프로필
      if (route.params?.userId && route.params?.userId !== userId) {
        setIsOther(true);

        const otherInfo = await fetchUserInfo(route.params?.userId);
        console.log('일반 유저 정보', otherInfo);
        setUserInfo(otherInfo);
      } else {
        setIsOther(false);

        const myInfo = await fetchMyInfo();
        console.log('내정보 불러오기', myInfo);
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
          <ReportModal
            visible={isReportModalVisible}
            oppoId={reportTargetUserId}
            tradeId={reportTargetTradeId}
            onClose={() => setIsReportModalVisible(false)}
          />
          <View style={styles.profileContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                source={{
                  uri: 'https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png',
                }}
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
              <Button mode="contained" onPress={handleLogout}>
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
              <List.AccordionGroup>
                {!isOther && userInfo?.purchaseRecord && (
                  <List.Accordion
                    title={`구매완료내역 ${userInfo.purchaseRecord.length}`}
                    id="2"
                    style={{marginBottom: 20}}>
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
                              item: {id: record.gifticonId},
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
                              onPress={
                                () =>
                                  navigation.navigate('Profile', {
                                    userId: record.sellerId,
                                  })
                                // navigation.navigate('Profile')
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
                  title={`판매완료내역 ${userInfo.salesRecord.length}`}
                  id="1">
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
              </List.AccordionGroup>
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
    width: '90%',
    marginLeft: '5%',
    backgroundColor: GlobalStyles.colors.backgroundPrimary,
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
