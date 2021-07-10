import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { CombinedDefaultThemeNavigation } from '../Theme';
import { Home } from '../Views/Home';
import { Settings } from '../Views/Settings';
import AppViews from './AppViews';

const Tab = createMaterialBottomTabNavigator();
export const Navigator = () => {
  return (
    <NavigationContainer theme={CombinedDefaultThemeNavigation}>
      <Tab.Navigator>
        <Tab.Screen name={AppViews.HOME} component={Home} />
        <Tab.Screen name={AppViews.SETTINGS} component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
