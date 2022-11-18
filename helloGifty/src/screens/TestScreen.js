import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {logout} from '../api/auth';
import React from 'react';

const TestScreen = () => {
  const handleLogout = async () => {
    console.log('로그아웃');
    await logout();
  };
  return (
    <View style={styles.container}>
      <Text>TestScreen</Text>
      <Text>hihihi</Text>
      <Text>hihihi</Text>
      <Text>hihihi</Text>
      <Button mode="contained" onPress={handleLogout}>
        로그아웃
      </Button>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'green',
  },
});
