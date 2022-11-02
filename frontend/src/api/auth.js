import { axiosCommonInstance } from './config/apiController';

const login = async (email, password) => {
  // console.log('로그인: ', email, password);
  try {
    const res = await axiosCommonInstance.post('login', { email, password });
    console.log('로그인 응답: ', res.data.data);
    const { accessToken } = res.data.data;

    return accessToken;
  } catch (error) {
    console.error(error);
  }
};

const signup = async (email, password) => {
  // console.log('회원가입: ', email, password);
  try {
    const res = await axiosCommonInstance.post('signup', {
      email: email,
      password: password,
    });

    // console.log('회원가입 응답: ', res.data);
    return res.data.success;
  } catch (error) {
    console.error(error);
  }
};

export { login, signup };
