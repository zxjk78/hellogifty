import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const DetailScreen = ({route}) => {
  const item = route.params.item.item
  return (
    <View style={styles.container}>
      <Text>DetailScreen</Text>
      <Image
        style={styles.img}
        source={require('../assets/starbucks.jpg')}
      />
      <Text>{item.id}</Text>
      <Text>{item.name}</Text>
      <Text>{item.expirationDate}</Text>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  img: {
    height: 100,
    width: 100,
    marginHorizontal: 'auto',
  }
})