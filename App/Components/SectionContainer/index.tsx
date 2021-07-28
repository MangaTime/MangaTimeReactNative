import { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Checkbox, useTheme } from 'react-native-paper';

export interface Props {
  children: React.ReactNode;
}

export const SectionContainer = ({ children }: Props): ReactElement => {
  const { colors, dark } = useTheme();

  return (
    <View
      style={{
        ...styles.container,
        ...{ backgroundColor: colors.primary },
      }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
  },
});
