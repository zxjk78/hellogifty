import {GlobalStyles} from '../../constants/style';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const TransparentButton = ({onPress, content}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={onPress}>
        <Text style={styles.text}>{content}</Text>
      </TouchableOpacity>
    </View>
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
