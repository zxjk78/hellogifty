import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../../constants/style';
// external module
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import React from 'react';
import starbucks from '../../assets/starbucks.jpg';
import { useNavigation } from '@react-navigation/native';

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

// https://callstack.github.io/react-native-paper/card.html

// 을 보면 style은 viewStyle을 따른다고 하고 이는  을 말한다.

const TicketListItem = (item) => {
  
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => {
        navigation.navigate('DetailScreen')
      }}
    >
      <Image 
        style={styles.img}
        source={require('../../assets/starbucks.jpg')}
      />
      <View style={styles.text}>
        <Text style={styles.brandName}>{item.item.brandName}</Text>
        <Text style={styles.itemName}>{item.item.name}</Text>
        <Text style={styles.expiration}>유효기간: {item.item.expirationDate} 까지</Text>
      </View>
      {/* <Image /> */}
      <Text>{item.item.categoryId}</Text>
    </TouchableOpacity>
  );
};

export default TicketListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.backgroundComponent,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    // borderColor: 'grey',
    justifyContent: 'space-between',
    // marginBottom: -30,
  },
  img: {
    // flex: 2,
    marginRight: 40,
    height: 100,
    width: 100,
    resizeMode: "cover",
  },
  text: {
    flex: 4,
  },
  brandName: {
    fontSize: 15,
  },
  itemName: {
    fontSize: 20,
  },
  expiration: {
    fontSize: 12,
  }
});
