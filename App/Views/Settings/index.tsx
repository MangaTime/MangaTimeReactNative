import { ReactElement } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, Button, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeSelector } from './Components/ThemeSelector';

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
      <Appbar>
        <Icon size={40} name="account-circle" style={{ color: colors.text }} />
        <Appbar.Content title="Setting" />
        <Button
          mode="contained"
          style={{
            ...styles.button,
            ...{ backgroundColor: colors.accent },
          }}
          onPress={() => console.log('test')}>
          Login
        </Button>
      </Appbar>
      <ScrollView>
        <ThemeSelector />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  statusBarColor: { width: '100%' },
  button: { borderRadius: 20 },
});
