import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Title, useTheme } from 'react-native-paper';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SettingsStackParamList } from '../../../../Navigator/SettingsStack/paramList';
import { useAppDispatch, useAppSelector } from '../../../../redux/Hooks';
import { changeTheme } from '../../../../redux/Theme/themeReducer';
import { AppTheme, ThemeName } from '../../../../Theme';
import { baseColors } from '../../../../Theme/baseColors';
import { ThemeSelectButton } from '../ThemeSelectButton';

export const VisibilityAndOrdering = (): ReactElement => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { themeName } = useAppSelector((state) => state.persist.theme);
  return (
    <View
      style={{
        ...styles.container,
        ...{ backgroundColor: colors.primary },
      }}>
      <View style={styles.titleContainer}>
        <Icon
          size={24}
          name="color-lens"
          style={[styles.titleIcon, { color: colors.text }]}
        />
        <Title>Sections visibility and ordering</Title>
      </View>
      <Button
        style={{ ...styles.button, backgroundColor: colors.accent }}
        color={colors.text}
        onPress={() => {
          navigation.navigate('SectionVisibilitiesAndOrderingPage');
        }}>
        Edit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleIcon: {
    marginRight: 16,
  },
  button: {
    borderRadius: 20,
    marginTop: 16,
  },
});
