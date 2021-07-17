import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from '../../../../redux/Hooks';
import { changeTheme } from '../../../../redux/Theme/themeReducer';
import { AppTheme, ThemeName } from '../../../../Theme';
import { baseColors } from '../../../../Theme/baseColors';
import { ThemeSelectButton } from '../ThemeSelectButton';

export const ThemeSelector = (): ReactElement => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { themeName } = useAppSelector((state) => state.persist.theme);
  return (
    <View
      style={{
        ...styles.themeSelectContainer,
        ...{ backgroundColor: colors.primary },
      }}>
      <View style={styles.themeTitleContainer}>
        <Icon
          size={50}
          name="color-lens"
          style={[styles.themeTitleIcon, { color: colors.text }]}
        />
        <Title>Color theme</Title>
      </View>
      <View style={styles.selectorContainer}>
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
        <ThemeSelectButton
          color={baseColors.blue.normal}
          selectedColor={baseColors.blue.dark}
          onPress={() =>
            dispatch(
              changeTheme({
                theme: AppTheme.Blue,
                themeName: ThemeName.Blue,
              }),
            )
          }
          isSelected={themeName === ThemeName.Blue}
        />
        <ThemeSelectButton
          color={baseColors.yellow.normal}
          selectedColor={baseColors.yellow.dark}
          onPress={() =>
            dispatch(
              changeTheme({
                theme: AppTheme.Yellow,
                themeName: ThemeName.Yellow,
              }),
            )
          }
          isSelected={themeName === ThemeName.Yellow}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  themeSelectContainer: {
    paddingVertical: 16,
    paddingLeft: 16,
    borderRadius: 10,
    shadowColor: baseColors.black.dark,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  themeTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  themeTitleIcon: {
    marginRight: 16,
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
