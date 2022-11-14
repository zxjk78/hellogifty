import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { fetchImage } from '../../api/image';

const B64Image = ({ src, style }) => {
  const [imgB64, setImgB64] = useState('1');
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
      {!isLoading && <Image source={{ uri: imgB64 }} style={style} />}
    </View>
  );
};

export default B64Image;

const styles = StyleSheet.create({});
