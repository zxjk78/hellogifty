import axios from 'axios';
import { getCookie, setCookie, removeCookie } from './cookie';
import { API_URL } from './http-config';

// 사용자 인증 필요없는 기능 사용할때 쓰는 axios instance
export const axiosCommonInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});

// 사용자 기능 필요할때: 헤더에 X-AUTH-TOKEN 사용하는 axios instance
export const axiosAuthInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': API_URL,
    // 'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  withCredentials: true, // refesh token 발급 위해서 사용하는 옵션
  timeout: 10000,
});

axiosAuthInstance.interceptors.request.use(
  (config) => {
    config.headers['X-AUTH-TOKEN'] = getCookie('accessToken');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isTokenRefreshing = false; // flag
let failedQueue = []; //

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosAuthInstance.interceptors.response.use(
  // 정상작동
  (response) => {
    return response;
  },
  // 응답에서 에러 처리
  (error) => {
    console.log(error);

    const { config, response } = error;
    const originalRequest = config;
    if (response.data.code === 1013 && !originalRequest._retry) {
      console.log('access token 만료. 재발급 요청');

      // 현재 다른 요청쪽에서 accessToken refreshing 위한 작업중인 경우, 에러난 요청은 if문을 진행해서 queue에 집어넣어진다.
      if (isTokenRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((accessToken) => {
            originalRequest.headers['X-AUTH-TOKEN'] = accessToken;
            return axiosAuthInstance(originalRequest);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      }
      // 요청이 이미 재시도 중인지 확인 위해 _retry 속성 추가, 지금이 최초 요청인 경우 flag 세움
      originalRequest._retry = true;
      isTokenRefreshing = true;

      return new Promise((resolve, reject) => {
        // console.log('accessToken 재발급 요청');

        axios
          .post(
            API_URL + 'reissue',
            {
              accessToken: getCookie('accessToken'),
            },
            { withCredentials: true }
          )
          .then(({ data }) => {
            console.log('새 토큰 발급 완료');

            const { accessToken: newToken, accessTokenExpireDate: newDate } =
              data.data;
            // 발급받으면 저장
            setCookie('accessToken', newToken);
            setCookie('accessTokenExpireDate', newDate);
            // axiosAuthInstance.defaults는 사실 해줄필요 없긴할듯? request Interceptor에서 처리해주니까
            axiosAuthInstance.defaults.headers.common['X-AUTH-TOKEN'] =
              newToken;
            // 원래 요청의 header를 새 토큰으로 변경한다
            originalRequest.headers['X-AUTH-TOKEN'] = newToken;
            // originalRequest.headers['Access-Control-Allow-Origin'] = API_URL;
            originalRequest.withCredentials = true;
            // 큐에 담긴 요청을 전부 다시 쏴주고, 지금 요청을 마지막으로 마무리한다.
            processQueue(null, newToken);
            resolve(axiosAuthInstance(originalRequest));
          })
          .catch((error) => {
            processQueue(error, null);
            reject(error);
          })
          .finally(() => {
            //무조건 마지막 작업으로 플래그 내림
            isTokenRefreshing = false;
          });
      });
    } else if (response.data.code === 1006) {
      // console.log('refresh token 만료, 로그아웃');

      removeCookie('accessToken');
      removeCookie('accessTokenExpireDate');
      failedQueue = [];
      window.location.reload();
    }

    return Promise.reject(error);
  }
);
