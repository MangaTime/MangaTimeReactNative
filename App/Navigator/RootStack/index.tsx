import React, { useEffect } from 'react';
import { Home } from '../../Views/Home';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { MangaDetail } from '../../Views/MangaDetail';
import { MangaReader } from '../../Views/MangaReader';
import { RootStackParamList } from './paramList';
import { StyleSheet } from 'react-native';
import { ListMangaView } from '../../Views/ListMangaView';
import { MainTabs } from '../MainTabs';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        statusBarTranslucent: true,
      })}>
      <RootStack.Screen name="MainTabs" component={MainTabs} />
      <RootStack.Screen name="ListMangaView" component={ListMangaView} />
      <RootStack.Screen name="MangaDetail" component={MangaDetail} />
      <RootStack.Screen name="MangaReader" component={MangaReader} />
    </RootStack.Navigator>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
