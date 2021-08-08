import { useNavigation } from '@react-navigation/native';
import { ReactElement } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SectionList } from '../Browse/sectionList';
import AppViews from '../../Navigator/AppViews';

export const SectionVisibilitiesAndOrderingPage = (): ReactElement => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
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
        <IconButton
          icon="keyboard-backspace"
          color={colors.text}
          style={{
            ...{ backgroundColor: colors.background },
          }}
          onPress={() => navigation.navigate(AppViews.SETTINGS)}
        />
        <Appbar.Content title="Settings" />
      </Appbar>
      <SectionList isEditingVisibility={true} />
    </>
  );
};

const styles = StyleSheet.create({
  statusBarColor: { width: '100%' },
});
