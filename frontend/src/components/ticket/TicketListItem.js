import { StyleSheet, Text, View, Image } from 'react-native';
import { GlobalStyles } from '../../constants/style';
// external module
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import React from 'react';
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

// https://callstack.github.io/react-native-paper/card.html

// 을 보면 style은 viewStyle을 따른다고 하고 이는  을 말한다.

const TicketListItem = () => {
  return (
    <Card style={styles.container}>
      {/* <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={LeftContent}
      /> */}
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Content>
        <Text>브랜드명</Text>
        <Title>상품 이름</Title>
        <Paragraph>유효기간: 2020-10-10 까지</Paragraph>
      </Card.Content>
      {/* <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
    </Card>
  );
};

export default TicketListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.backgroundComponent,
    padding: 10,
    alignItems: 'center',
  },
});
