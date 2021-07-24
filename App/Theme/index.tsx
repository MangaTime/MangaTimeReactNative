import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { baseColors } from './baseColors';

const Black = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  dark: true,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: baseColors.black.light, // Light variant
    accent: baseColors.black.dark, // Dark variant
    background: baseColors.black.normal, // Normal variant
    text: '#ffffff',
    card: baseColors.black.light, // Light variant
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
    primary: baseColors.white.light,
    accent: baseColors.white.dark,
    background: baseColors.white.normal,
    text: '#000000',
    card: baseColors.white.light,
  },
};

const Pink = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: baseColors.pink.light,
    accent: baseColors.pink.dark,
    background: baseColors.pink.normal,
    text: '#000000',
    card: baseColors.pink.light,
  },
};

const Red = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  dark: true,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: baseColors.red.light,
    accent: baseColors.red.dark,
    background: baseColors.red.normal,
    text: '#ffffff',
    card: baseColors.red.light,
  },
};

const Blue = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: baseColors.blue.light,
    accent: baseColors.blue.dark,
    background: baseColors.blue.normal,
    text: '#000000',
    card: baseColors.blue.light,
  },
};

const Yellow = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: baseColors.yellow.light,
    accent: baseColors.yellow.dark,
    background: baseColors.yellow.normal,
    text: '#000000',
    card: baseColors.yellow.light,
  },
};

export const AppTheme = { Black, White, Pink, Red, Blue, Yellow };

export const ThemeName = {
  Black: 'black',
  White: 'white',
  Pink: 'pink',
  Red: 'red',
  Blue: 'blue',
  Yellow: 'yellow',
};
