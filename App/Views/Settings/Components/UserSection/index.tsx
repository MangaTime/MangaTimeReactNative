import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { SectionTitle } from '../SectionTitle';

export const UserSection = (): ReactElement => {
  return (
    <View style={styles.container}>
      <SectionTitle title="User" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginTop: 16 },
});
