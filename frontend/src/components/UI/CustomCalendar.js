import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment/moment';
import { GlobalStyles } from '../../constants/style';
import { Button } from 'react-native-paper';
const CustomCalendar = ({ handleModalClose, onDateChange }) => {
  // console.log('모멘트모듈', moment().format('YYYY-MM-DD'));
  const [expireDate, setExpireDate] = useState(moment().format('YYYY-MM-DD'));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>유효기간을 선택해 주세요</Text>
      <Calendar
        // Initially visible month. Default = now
        initialDate={expireDate}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={moment().format('YYYY-MM-DD')}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          setExpireDate(day.dateString);
          onDateChange(day.dateString);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log('selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(date) => {
          console.log('month changed', date);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={(direction) => <Arrow />}
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
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={(date) => {
          /*Return JSX*/
          return (
            <View>
              <Text style={styles.calendarHeader}>
                {moment().format('yyyy년 Mo')}
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
