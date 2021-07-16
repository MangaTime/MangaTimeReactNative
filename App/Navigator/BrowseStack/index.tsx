import React, { useEffect } from 'react';
import { Home } from '../../Views/Home';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
// import { MangaDetail } from '../../Views/MangaDetail';
// import { MangaReader } from '../../Views/MangaReader';
import { BrowseStackParamList } from './paramList';
import { Browse } from '../../Views/Browse';
import { ListMangaView } from '../../Views/Browse/listMangaView';

const BrowseStack = createNativeStackNavigator<BrowseStackParamList>();

export const BrowseStackScreen = () => {
  return (
    <BrowseStack.Navigator
      screenOptions={() => ({
        headerShown: false,
        statusBarTranslucent: true,
      })}>
      <BrowseStack.Screen name="Browse" component={Browse} />
      <BrowseStack.Screen name="ListMangaView" component={ListMangaView} />
      {/* <BrowseStack.Screen name="MangaDetail" component={MangaDetail} />
      <BrowseStack.Screen name="MangaReader" component={MangaReader} /> */}
    </BrowseStack.Navigator>
  );
};
