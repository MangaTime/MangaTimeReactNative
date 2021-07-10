import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

export const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  dark: true,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: '#212121',
    accent: '#000000',
    background: '#484848',
    text: '#ffffff',
    card: '#212121',
  },
};

// Because navigation is a bitch to theme
export const CombinedDefaultThemeNavigation = {
  ...CombinedDefaultTheme,
  dark: false,
};
