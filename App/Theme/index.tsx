import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

const Black = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  dark: true,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: '#212121', // Normal variant
    accent: '#000000', // Dark variant
    background: '#484848', // Light variant
    text: '#ffffff',
    card: '#212121', // Normal variant
  },
};

const White = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: '#BDBDBD',
    accent: '#8D8D8D',
    background: '#EFEFEF',
    text: '#000000',
    card: '#BDBDBD',
  },
};

export const CombinedDefaultTheme = {
  ...White,
};

// Because navigation is a bitch to theme
export const CombinedDefaultThemeNavigation = {
  ...CombinedDefaultTheme,
  dark: false,
};

export const AppTheme = { Black, White };
