import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAllMMSAfterAccess } from '../utils/mmsFunc';
import { requestReadMMSPermission } from '../utils/getPermission';
const TestScreen = () => {
  useEffect(() => {
    requestReadMMSPermission();
    getAllMMSAfterAccess();
  }, []);

  return (
    <View>
      <Text>TestScreen</Text>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
