import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

const Practice = () => {33
  

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000) 
  })

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator 
        style={{paddingTop: 200}}
        size="large"
        color="green"
        animating={loading}
      />
      <Text>Hello</Text>
    </View>
  );
};

export default Practice;
