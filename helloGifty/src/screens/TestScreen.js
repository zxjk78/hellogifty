import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const TestScreen = () => {
  return (
    <View>
      <Image
        source={{uri: 'content://mms/part/' + 3}}
        style={{width: 100, height: 100}}
      />
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
