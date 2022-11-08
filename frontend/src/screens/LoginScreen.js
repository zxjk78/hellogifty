import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  BackHandler,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import { WebView } from 'react-native-webview';

const REST_API_KEY = 'f8ffe8f26fd3086ddf3c5494651286cc';
// const REDIRECT_URI = '카카오 디벨로퍼에서 설정한 redirect uri';
const REDIRECT_URI = 'http://localhost:8080/api';

// 로그인이 성공하게 되면 어떠한 주소로 이동하게 되는데, 이 주소는 우리 Redirect URI로 code 쿼리스트링을 담아주어 보내주는 주소이다.
// 해당 값은 accesscode이고 생각하면 되고, 백엔드에서 이를 이용해서 accessToken을 받고 나머지 작업을 수행한다..
const INJECTED_JAVASCRIPT = `
        (function() {
          function wrap(fn) {
            return function wrapper() {
              let res = fn.apply(this, arguments);
              window.ReactNativeWebView.postMessage('navigationStateChange');
              return res;
            }
          }
    
          history.pushState = wrap(history.pushState);
          history.replaceState = wrap(history.replaceState);
          window.addEventListener('popstate', function() {
            window.ReactNativeWebView.postMessage('navigationStateChange');
          });
        })();
    
        true;
      `;

const requestToken = async (code) => {
  const requestTokenUrl = 'https://kauth.kakao.com/oauth/token';

  const options = qs.stringify({
    grant_type: 'authorization_code',
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code,
  });

  try {
    const tokenResponse = await axios.post(requestTokenUrl, options);
    const ACCESS_TOKEN = tokenResponse.data.access_token;

    const body = {
      ACCESS_TOKEN,
    };
    const response = await axios.post(REDIRECT_URI, body);
    const value = response.data;
    const result = await storeUser(value);
    if (result === 'stored') {
      const user = await getData('user');
      dispatch(read_S(user));
      await navigation.navigate('Main');
    }
  } catch (e) {
    console.log(e);
  }
};

const getCode = (target) => {
  const exp = 'code=';
  const condition = target.indexOf(exp);
  if (condition !== -1) {
    const requestCode = target.substring(condition + exp.length);
    // console.log(requestCode);
    requestToken(requestCode);
  }
};

function LoginScreen() {
  const webViewRef = useRef();
  const [canGoBack, setCanGoBack] = useState(false);
  useEffect(() => {
    const onPress = () => {
      if (webViewRef.current && canGoBack) {
        webViewRef.current.goBack();
        return true;
      } else {
        return false;
      }
    };
    BackHandler.addEventListener('hardwareBackPress', onPress);
    // useEffect 의 return의 의미는 lifecycle에서 unmount 됬을 때의 실행되는 구문
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPress);
    };
  }, [canGoBack]);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        onNavigationStateChange={setCanGoBack}
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={({ nativeEvent: state }) => {
          if (state.data === 'navigationStateChange') {
            setCanGoBack(state.canGoBack);
          }
          const data = state.url;
          getCode(data);
        }}
      />
    </View>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({});
