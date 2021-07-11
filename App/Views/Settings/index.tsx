import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { changeTheme } from '../../redux/Theme/themeReducer';
import { AppTheme, ThemeName } from '../../Theme';
import { baseColors } from '../../Theme/baseColors';
import { ThemeSelectButton } from './Components/ThemeSelectButton';

export const Settings = () => {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { themeName } = useAppSelector((state) => state.persist.theme);
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
          style={{
            ...styles.button,
            ...{ backgroundColor: colors.accent },
          }}
          onPress={() => console.log('test')}>
          Login
        </Button>
      </Appbar>
      <View
        style={{
          ...styles.themeSelectContainer,
          ...{ backgroundColor: colors.primary },
        }}>
        <ThemeSelectButton
          color={baseColors.white.normal}
          selectedColor={baseColors.white.dark}
          onPress={() =>
            dispatch(
              changeTheme({
                theme: AppTheme.White,
                themeName: ThemeName.White,
              }),
            )
          }
          isSelected={themeName === ThemeName.White}
        />
        <ThemeSelectButton
          color={baseColors.black.normal}
          selectedColor={baseColors.black.dark}
          onPress={() =>
            dispatch(
              changeTheme({
                theme: AppTheme.Black,
                themeName: ThemeName.Black,
              }),
            )
          }
          isSelected={themeName === ThemeName.Black}
        />
        <ThemeSelectButton
          color={baseColors.pink.normal}
          selectedColor={baseColors.pink.dark}
          onPress={() =>
            dispatch(
              changeTheme({
                theme: AppTheme.Pink,
                themeName: ThemeName.Pink,
              }),
            )
          }
          isSelected={themeName === ThemeName.Pink}
        />
        <ThemeSelectButton
          color={baseColors.red.normal}
          selectedColor={baseColors.red.dark}
          onPress={() =>
            dispatch(
              changeTheme({
                theme: AppTheme.Red,
                themeName: ThemeName.Red,
              }),
            )
          }
          isSelected={themeName === ThemeName.Red}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  statusBarColor: { width: '100%' },
  button: { borderRadius: 20 },
  themeSelectContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
  },
});
