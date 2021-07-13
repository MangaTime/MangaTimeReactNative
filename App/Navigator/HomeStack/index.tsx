import React, { useEffect } from 'react';
import { Home } from '../../Views/Home';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { MangaDetail } from '../../Views/MangaDetail';
import { MangaReader } from '../../Views/MangaReader';
import { HomeStackParamList } from './paramList';

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
