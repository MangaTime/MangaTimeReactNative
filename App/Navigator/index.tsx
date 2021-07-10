import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CombinedDefaultThemeNavigation } from '../Theme';
import { Home } from '../Views/Home';
import { Settings } from '../Views/Settings';
import AppViews from './AppViews';

const Tab = createMaterialBottomTabNavigator();
export const Navigator = () => {
  return (
    <NavigationContainer theme={CombinedDefaultThemeNavigation}>
      <Tab.Navigator shifting>
        <Tab.Screen
          name={AppViews.HOME}
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name={AppViews.BROWSE}
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="library-books" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name={AppViews.SETTINGS}
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="settings" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
