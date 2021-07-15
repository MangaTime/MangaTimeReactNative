import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, Button, Title, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
      </ScrollView>
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
