import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
<<<<<<< HEAD
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '../redux/Hooks';
=======
>>>>>>> bd9c2cd (new chapter notification on android)
import React, { useEffect } from 'react';
import { Home } from '../Views/Home';
import { Settings } from '../Views/Settings';
import AppViews from './AppViews';

const Tab = createMaterialBottomTabNavigator();
export const Navigator = () => {
  const { theme } = useAppSelector((state) => state.persist.theme);
  const navTheme = { ...theme, dark: false };
  return (
    <NavigationContainer theme={navTheme}>
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
