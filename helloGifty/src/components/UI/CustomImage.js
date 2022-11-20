import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';

const CustomImage = ({source, style}) => {
  const [isError, setIsError] = useState(false);
  return (
    <Image
      source={
        !isError ? {uri: source} : require('../../assets/default-image.jpg')
      }
      style={style || {width: 70, height: 70}}
      onError={() => setIsError(true)}
    />
  );
};

export default CustomImage;

const styles = StyleSheet.create({});
