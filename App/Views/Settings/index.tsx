import { ReactElement } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppSection } from './Components/AppSection';

export const Settings = (): ReactElement => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={[
          styles.statusBarColor,
          {
            backgroundColor: colors.accent,
            height: insets.top,
          },
        ]}
      />
      <StatusBar
        backgroundColor="transparent"
        barStyle={!dark ? 'dark-content' : 'light-content'}
        translucent
      />
      <Appbar dark={dark}>
        <Appbar.Content title="Setting" />
      </Appbar>
      <ScrollView>
        <AppSection />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  statusBarColor: { width: '100%' },
});
