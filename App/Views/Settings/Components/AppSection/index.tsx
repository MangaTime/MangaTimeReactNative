import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { SectionTitle } from '../SectionTitle';
import { ThemeSelector } from '../ThemeSelector';
import { VisibilityAndOrdering } from '../VisibilityAndOrdering';

export const AppSection = (): ReactElement => {
  return (
    <View style={styles.container}>
      <SectionTitle title="App" />
      <ThemeSelector />
      <VisibilityAndOrdering />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginTop: 16 },
});
