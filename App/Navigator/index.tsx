import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ReactElement } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '../redux/Hooks';
import AppViews from './AppViews';
import { HomeStackScreen } from './HomeStack';
import { navigationRef } from './navigationRef';
import { BrowseStackScreen } from './BrowseStack';
import { SettingsStackScreen } from './SettingsStack';

const Tab = createMaterialBottomTabNavigator();

export const Navigator = (): ReactElement => {
  const { theme } = useAppSelector((state) => state.persist.theme);
  const navTheme = { ...theme, dark: false };

  return (
    <NavigationContainer theme={navTheme} ref={navigationRef}>
      <Tab.Navigator shifting activeColor={theme.colors.text}>
        <Tab.Screen
          name={AppViews.HOME}
          component={HomeStackScreen}
          options={{
            tabBarIcon: () => (
              <Icon name="home" color={theme.colors.text} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name={AppViews.BROWSE}
          component={BrowseStackScreen}
          options={{
            tabBarIcon: () => (
              <Icon name="library-books" color={theme.colors.text} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name={AppViews.SETTINGS}
          component={SettingsStackScreen}
          options={{
            tabBarIcon: () => (
              <Icon name="settings" color={theme.colors.text} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
