import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { fetchImage } from '../../api/image';
import { API_URL } from '../../api/config/http-config';

const B64Image = ({ src, style }) => {
  const [imgB64, setImgB64] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await fetchImage(src);
      const res2 = 'data:image/jpeg;base64,' + res;
      setImgB64(res2);
    })();

    setIsLoading(false);
  }, []);

  return (
    <View>
      {!isLoading && imgB64 && (
        <Image
          source={{ uri: API_URL + 'image/brand?path=BHC.png' }}
          style={style}
          onError={() => {
            // console.log('이미지에러');
            setImgB64(
              'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png'
            );
          }}
        />
      )}
    </View>
  );
};

export default B64Image;

const styles = StyleSheet.create({});
