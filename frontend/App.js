import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  PermissionsAndroid,
  View,
  Image,
  NativeModules,
  ActivityIndicator,
} from 'react-native';

import Practice from './src/components/Practice';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
// import { requestReadMMSPermission } from './src/utils/getPermission';

// import { convertImageUri } from './src/utils/mmsFunc';
const App = () => {
  const { MMSReadModule } = NativeModules;
  const [imgTmp, setImgTmp] = useState(null);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     console.log(await requestReadMMSPermission());

  //     const uri = await convertImageUri();
  //     console.log('uri: ', uri);
  //     setImgTmp(uri);
  //   })();
  // }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000) 
  // })

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>react test_mms</Text>
      {imgTmp && (
        <Image source={{ uri: imgTmp }} style={{ width: 300, height: 300 }} />
      )}
      <Text>이미지</Text>
      <Practice />
    </View>
  );
};

export default App;
