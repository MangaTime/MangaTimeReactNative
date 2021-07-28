import React, { useEffect } from 'react';
import { Home } from '../../Views/Home';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { MangaDetail } from '../../Views/MangaDetail';
import { MangaReader } from '../../Views/MangaReader';
import { HomeStackParamList } from './paramList';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { ListMangaView } from '../../Views/ListMangaView';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        statusBarTranslucent: true,
      })}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ListMangaView" component={ListMangaView} />
      <HomeStack.Screen name="MangaDetail" component={MangaDetail} />
      <HomeStack.Screen name="MangaReader" component={MangaReader} />
    </HomeStack.Navigator>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
