import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { SectionTitle } from '../SectionTitle';
import { ThemeSelector } from '../ThemeSelector';

export const AppSection = (): ReactElement => {
  return (
    <View style={styles.container}>
      <SectionTitle title="App" />
      <ThemeSelector />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginTop: 16 },
});
