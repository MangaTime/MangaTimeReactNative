import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Home } from '../Views/Home';
import { Settings } from '../Views/Settings';
import AppViews from './AppViews';

const Tab = createBottomTabNavigator();
export const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={AppViews.HOME} component={Home} />
        <Tab.Screen name={AppViews.SETTINGS} component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
