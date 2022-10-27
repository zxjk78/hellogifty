import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React from 'react';

import { WebView } from 'react-native-webview';

const REST_API_KEY = 'f8ffe8f26fd3086ddf3c5494651286cc';
// const REDIRECT_URI = '카카오 디벨로퍼에서 설정한 redirect uri';
const REDIRECT_URI = 'http://localhost:8080/api';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

function LoginScreen() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        // onMessage={(event) => {
        //   const data = event.nativeEvent.url;
        //   getCode(data);
        // }}
      />
    </View>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({});
