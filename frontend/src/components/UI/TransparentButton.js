import { GlobalStyles } from '../../constants/style';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const TransparentButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TransparentButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
  },
  text: {
    color: GlobalStyles.colors.mainPrimary,
  },
});
