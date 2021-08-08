import { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export const SectionListFooter = (): ReactElement => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: colors.text,
        }}>
        Drag and drop to reorder sections.
      </Text>
      <Text
        style={{
          color: colors.text,
        }}>
        Tick checkbox to show section on Home screen.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    alignItems: 'center',
    width: '100%',
  },
});
