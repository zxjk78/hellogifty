import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import moment from 'moment/moment';
import {GlobalStyles} from '../../constants/style';
import {Button} from 'react-native-paper';

const Arrow = ({direction}) => {
  console.log('direction: ', direction);
  return (
    <View>
      <Text> 123 </Text>
    </View>
  );
};

const CustomCalendar = ({handleModalClose, onDateChange, selectedDate}) => {
  // console.log('모멘트모듈', moment().format('YYYY-MM-DD'));
  const [expireDate, setExpireDate] = useState(
    selectedDate || moment().format('YYYY-MM-DD'),
  );

  const addMonth = () => {
    const newDate = moment(expireDate).add(1, 'month');
    setExpireDate(newDate.format('yyyy-MM-DD'));
  };
  const subtractMonth = () => {
    const newDate = moment(expireDate).subtract(1, 'month');
    setExpireDate(newDate.format('yyyy-MM-DD'));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>유효기간을 선택해 주세요</Text>
      <Calendar
        // Initially visible month. Default = now
        initialDate={expireDate}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={moment().format('YYYY-MM-DD')}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          setExpireDate(day.dateString);
          onDateChange(day.dateString);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => {
          console.log('selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined

        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={direction => (
          <View>
            {direction === 'right' ? <Text>{'>'}</Text> : <Text>{'<'}</Text>}
          </View>
        )}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={() => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={() => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={date => {
          /*Return JSX*/
          return (
            <View>
              <Text style={styles.calendarHeader}>
                {moment(expireDate).format(`yyyy년 MM월`)}
              </Text>
            </View>
          );
        }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
        style={styles.calendar}
      />
      <View style={styles.btnContainer}>
        <Button mode="outlined">취소</Button>
        <Button mode="contained" onPress={handleModalClose}>
          확인
        </Button>
      </View>
    </View>
  );
};

export default CustomCalendar;

const styles = StyleSheet.create({
  title: {
    color: GlobalStyles.colors.textPrimary,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '10%',
  },
  container: {
    flex: 1,
    marginTop: '20%',
    width: '90%',
    marginLeft: '5%',
  },
  calendar: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    height: 350,
    // width: 400,
  },
  calendarHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 5,
    color: GlobalStyles.colors.mainPrimary,
  },
  btnContainer: {
    width: '90%',
    marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
});
