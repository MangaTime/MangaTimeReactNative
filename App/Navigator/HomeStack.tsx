import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '../redux/Hooks';
import React, { useEffect } from 'react';
import { Home } from '../Views/Home';
import { Settings } from '../Views/Settings';
import AppViews from './AppViews';

import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { MangaDetail } from '../Views/MangaDetail';
import { MangaReader } from '../Views/MangaReader';

export type HomeStackParamList = {
  Home: undefined;
  MangaDetail: undefined;
  MangaReader: undefined;
};
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        // headerTitleStyle: { color: "white", fontWeight: "bold" },
        // headerStyle: { backgroundColor: theme.foreground },
        headerTintColor: '#5AC8FA',
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="MangaDetail" component={MangaDetail} />
      <HomeStack.Screen
        name="MangaReader"
        component={MangaReader}
        options={{ title: '' }}
      />
    </HomeStack.Navigator>
  );
};
