import { axiosAuthInstance } from "./config/apiController";
import RNFS from "react-native-fs";
import { fetchImage } from "./image";
import { API_URL } from "./config/http-config";

export const fetchMyGifticonList = async () => {
  // console.log('내 기프티콘 목록 받기');
  try {
    const res = await axiosAuthInstance.get("mygifticon/");

    // console.log('기프티콘 목록 데이터', res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMySellingGifticonList = async () => {
  try {
    const res = await axiosAuthInstance.get("mygifticon/ontrade");
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchMyGifticonDetail = async (gifticonId) => {
  console.log("내 기프티콘 상세 fetch");
  try {
    const res = await axiosAuthInstance.get("mygifticon/" + gifticonId);

    // console.log('기프티콘 상세 데이터', res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addGifticon = async (gifticonArr) => {
  try {
    console.log("내 기프티콘 등록");
    // 이미지 url을 이미지 file로 변환시켜야 함
    const gifticonArr2 = gifticonArr.map((gifticon, index) => {
      const { name, expirationDate, categoryId, number } = gifticon;
      // console.log(name);
      return {
        name,
        expirationDate,
        categoryId,
        number,
        // fileBase64: 'data:image/jpeg;base64,' + item.couponImg,
        fileBase64: ("data:image/jpeg;base64," + gifticon.couponImg).replace(
          /\n/g,
          ""
        ),
      };
    });

    const enrollGifticon = (item) => {
      return axiosAuthInstance.post("mygifticon/", item);
    };

    Promise.all(gifticonArr2.map((gifticon) => enrollGifticon(gifticon)))
      .then(() => {
        console.log("기프티콘 등록 성공");
      })
      .catch(() => {
        console.log("기프티콘 등록 실패");
      });

    // const res = await axiosAuthInstance.post('mygifticon/', gifticonArr2[0]);
  } catch (error) {
    console.log(error);
  }
};

export const addGifticonFromFile = async (gifticonInfo) => {
  try {
    const gifticon = {
      ...gifticonInfo,
      fileBase64: ("data:image/jpeg;base64," + gifticonInfo.fileBase64).replace(
        /\n/g,
        ""
      ),
    };
    // console.log('요청 dto: ', Object.keys(gifticon));
    const res = await axiosAuthInstance.post("mygifticon/", gifticon);
    return res.data.success;
  } catch (error) {
    console.log("앨범에서 쿠폰 등록 시 에러: ", error);
  }
};

const getGifticonDetail = async (id) => {
  try {
    const res = await axiosAuthInstance.get(`/mygifticon/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

const ModifiedGifticon = (data) => {
  console.log(data);
};

// const sellMyGifticon = (info) => {
//   console.log(info.imagePath, '이미지 이미지')
//   RNFS.readFile(info.imagePath, 'base64')
//     .then(async (res) => {
//       const cropFileBase64 = res;
//       const data = {
//         content: info.content,
//         cropFileBase64: cropFileBase64,
//         gifticonId: info.id,
//         price: +info.price,
//         title: info.title,
//       };
//       try {
//         const res = await axiosAuthInstance.post('trade/', data);
//         console.log('판매등록 성공!!');
//         return res.data.data;
//       } catch (error) {
//         console.log(error);
//       }
//     })
//     .catch((error) => console.log(error, '여기서'));
// };
const sellMyGifticon = async (info) => {
  console.log(info, "이미지 이미지");

  try {
    const resImgB64 = await fetchImage(
      API_URL + "image/gifticon?path=" + info.imagePath
    );
    console.log(resImgB64, 'base64 이미지 이미지')
    const data = {
      content: info.content,
      cropFileBase64: 'data:image/jpeg;base64,' + resImgB64,
      gifticonId: info.id,
      price: +info.price,
      title: info.title,
    };

    const res = await axiosAuthInstance.post("trade/", data);
    console.log("판매등록 성공!!");
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteMyGifticon = async (id) => {
  try {
    const res = await axiosAuthInstance.delete(`mygifticon/${id}`)
    return console.log('삭제 성공')
  } catch (error) {console.log(error, '기프티콘 삭제 에러')}
}

export { ModifiedGifticon, sellMyGifticon, getGifticonDetail, deleteMyGifticon };
