import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Settings = () => {
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
        <Avatar.Icon size={50} icon="account-circle" />
        <Appbar.Content title="Setting" />
        <Button
          mode="contained"
          style={{ ...styles.button, ...{ backgroundColor: colors.accent } }}
          onPress={() => console.log('test')}>
          Login
        </Button>
      </Appbar>
    </>
  );
};

const styles = StyleSheet.create({
  statusBarColor: { width: '100%' },
  button: { borderRadius: 20 },
});
