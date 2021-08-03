import { NavigationContainer } from '@react-navigation/native';
import { ReactElement } from 'react';
import { useAppSelector } from '../redux/Hooks';
import { navigationRef } from './navigationRef';
import { RootStackScreen } from './RootStack';

export const Navigator = (): ReactElement => {
  const { theme } = useAppSelector((state) => state.persist.theme);
  const navTheme = { ...theme, dark: false };

  return (
    <NavigationContainer theme={navTheme} ref={navigationRef}>
      <RootStackScreen />
    </NavigationContainer>
  );
};
