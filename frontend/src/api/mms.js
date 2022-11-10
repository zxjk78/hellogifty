import { axiosAuthInstance } from './config/apiController';

// mms 이미지 배열을 스프링 서버에 보내고, 스프링은 장고로 보내고, 그 중에서 기프티콘 이미지라고 인식된 것의 idx, 데이터만 반환받는 함수
const sendMMSImage = async (imageStringArr) => {
  try {
    const response = await axiosAuthInstance.post(
      'url 어쩌고 저쩌고',
      imageStringArr
    );
    //기프티콘 이미지 또는 이미지는 전송시간이 오래 걸리니 응답으로 받지는 말고, 해당 이미지가 들어온 번호의 배열, 유효기간, 기프티콘 이름, 브랜드명, 브랜드 이미지 필요
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 아래 함수의 테스트 함수
const dummySendMMSImage = async (imageStringArr) => {
  return [
    {
      id: 1,
      brandName: 'Starbucks',
      brandImage:
        'https://mcdonough.com/wp-content/uploads/2020/09/starbucks-logo-png-transparent.png',
      name: '[스타벅스] 아메리카노 1잔',
      expirationDate: '2022-12-12',
      couponImg: imageStringArr[1],
      categoryId: 1,
    },
    {
      id: 5,
      brandName: 'Ediya',
      brandImage:
        'https://mblogthumb-phinf.pstatic.net/20160604_62/ppanppane_1465006723421ByIAd_PNG/%C0%CC%B5%F0%BE%DF%B7%CE%B0%ED_%282%29.png?type=w800',
      name: '이디야 카페라떼 tall',
      expirationDate: '2022-12-22',
      couponImg: imageStringArr[1],
      categoryId: 3,
    },
    {
      id: 7,
      brandName: 'Ediya',
      brandImage:
        'https://mblogthumb-phinf.pstatic.net/20160604_62/ppanppane_1465006723421ByIAd_PNG/%C0%CC%B5%F0%BE%DF%B7%CE%B0%ED_%282%29.png?type=w800',
      name: '잘못된데이터',
      expirationDate: '잘못읽은데이터',
      couponImg: imageStringArr[0],
      categoryId: 1,
    },
    {
      id: 71,
      brandName: 'Ediya',
      brandImage:
        'https://mblogthumb-phinf.pstatic.net/20160604_62/ppanppane_1465006723421ByIAd_PNG/%C0%CC%B5%F0%BE%DF%B7%CE%B0%ED_%282%29.png?type=w800',
      name: '잘못된데이터2',
      expirationDate: '잘못읽은데이터',
      couponImg: imageStringArr[0],
      categoryId: 1,
    },
    {
      id: 27,
      brandName: 'Ediya',
      brandImage:
        'https://mblogthumb-phinf.pstatic.net/20160604_62/ppanppane_1465006723421ByIAd_PNG/%C0%CC%B5%F0%BE%DF%B7%CE%B0%ED_%282%29.png?type=w800',
      name: '잘못된데이터3',
      expirationDate: '잘못읽은데이터',
      couponImg: imageStringArr[0],
      categoryId: 1,
    },
  ];
};

export { sendMMSImage, dummySendMMSImage };
