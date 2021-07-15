import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, Paragraph, Title } from 'react-native-paper';

const LeftContent = () => <Avatar.Icon icon="folder" />;

export const Cards = () => (
  <Card style={styles.container}>
    <Card.Title
      title="Card Title"
      subtitle="Card Subtitle"
      left={LeftContent}
    />
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
);
const styles = StyleSheet.create({
  container: {},
  title: {},
});
