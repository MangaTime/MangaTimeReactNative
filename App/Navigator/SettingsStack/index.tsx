import React, { useEffect } from 'react';
import { Home } from '../../Views/Home';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
// import { MangaDetail } from '../../Views/MangaDetail';
// import { MangaReader } from '../../Views/MangaReader';
import { SettingsStackParamList } from './paramList';
import { Settings } from '../../Views/Settings';
import { SectionVisibilitiesAndOrderingPage } from '../../Views/SectionVisibilitiesAndOrderingPage';

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={() => ({
        headerShown: false,
        statusBarTranslucent: true,
      })}>
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen
        name="SectionVisibilitiesAndOrderingPage"
        component={SectionVisibilitiesAndOrderingPage}
      />
    </SettingsStack.Navigator>
  );
};
