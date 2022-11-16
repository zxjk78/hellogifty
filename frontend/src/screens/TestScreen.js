import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { logout } from '../api/auth';

const TestScreen = () => {
  return (
    <View>
      <Text>TestScreen</Text>
      <Button mode='contained' onPress={async()=>{ const res = await logout()}}>로그아웃</Button>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
