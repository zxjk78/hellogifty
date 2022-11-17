import {StyleSheet, Text, View, Modal, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {submitUserReport} from '../../api/trade';
import {GlobalStyles} from '../../constants/style';
import SelectDropdown from 'react-native-select-dropdown';
import {fetchUserInfo} from '../../api/profile';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

// 상대, 거래 아이디필요
const ReportModal = ({oppoId, tradeId, visible, onClose}) => {
  const [content, setContent] = useState('');
  const [reason, setReason] = useState(''); //     BAD_WORD, INVALID_PRODUCT, TAKE_AND_RUN
  const [reportUserName, setReportUserName] = useState('');
  useEffect(() => {
    (async () => {
      const res = await fetchUserInfo(oppoId);
      console.log('신고할 유저 찾기', res);
      setReportUserName(res.name);
    })();
  }, [oppoId]);

  const handleSubmitReport = async () => {
    const res = await submitUserReport(tradeId, oppoId, content, reason);
    if (res) {
      // toast 써서 보여주면 될듯
      console.log('신고접수 성공');
      onClose();
    } else {
      console.log('신고접수 실패');
    }
  };

  return (
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
          <Text style={styles.header}>신고하기</Text>
          <Text style={{fontSize: 15, marginTop: 3}}>
            {reportUserName} 님을 신고하시는 이유가 무엇인가요?
          </Text>
        </View>
        <SelectDropdown
          data={[
            {key: 'BAD_WORD', value: '욕설을 했어요'},
            {key: 'INVALID_PRODUCT', value: '유효하지 않은 코드번호에요'},
            {
              key: 'TAKE_AND_RUN',
              value: '채팅으로 기프티콘의 선 지급을 요구했어요',
            },
          ]}
          onSelect={selectedItem => {
            // 여기서 set함수 써서 state 변경
            // console.log('내가 선택한 선택지 아이디값', selectedItem.key);
            setReason(selectedItem.key);
          }}
          buttonTextAfterSelection={selectedItem => {
            // 선택 후 selecttion 창에 보이는 선택지
            return selectedItem.value;
          }}
          rowTextForSelection={item => {
            // 여기서 선택지 dropdown을 봄
            return item.value;
          }}
          buttonStyle={styles.commonSelectStyle}
          dropdownStyle={{...styles.commonSelectStyle, ...styles.itemStyle}}
          renderCustomizedButtonChild={selectedItem => (
            <View>
              {selectedItem ? (
                <Text>{selectedItem.value}</Text>
              ) : (
                <Text>신고사유</Text>
              )}
            </View>
          )}
          renderCustomizedRowChild={selectedItem => (
            <Text>{selectedItem.value}</Text>
          )}
        />
        <Text style={{fontSize: 15, marginTop: 3}}>
          좀 더 구체적인 상황을 적어주시면, 이후 처리에 도움이 되요.
        </Text>
        <TextInput
          multiline
          numberOfLines={3}
          onChangeText={setContent}
          style={{padding: 10, borderWidth: 2}}
        />

        <Button mode="contained" onPress={handleSubmitReport}>
          신고 제출하기
        </Button>
      </View>
    </Modal>
  );
};

export default ReportModal;

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
