import moment from 'moment/moment';
import 'moment/locale/ko';

// 날짜 데이터 받아서 방금 전, 몇 시간 전, 하루 넘어가면 Date text로 변환하는 함수
export const expressDateCal = (createdDate, isDetail = true) => {
  if (isDetail) {
    const created = moment(createdDate).format('YYYY-MM-DD HH:mm');
    return created;
  } else {
    // 요약 피드에서 보일 때 ~ 분 ~ 시간 전 ... 날짜
    const m = moment(createdDate);
    // 1일 이상 밀리면 어제, 몇시 로

    if (m.isBefore(moment().subtract(1, 'days'))) {
      return '어제 ' + moment(createdDate).format('HH:mm');
    } else if (m.isBefore(moment().subtract(2, 'days'))) {
      // 2일 이상 밀리면 1년 이상 밀렸는지 보고 날짜로
      if (m.isBefore(moment().subtract(1, 'years'))) {
        return moment(createdDate).format('YYYY-MM-DD');
      }

      return moment(createdDate).format('MM-DD');
    }
    return m.fromNow();
  }
};
