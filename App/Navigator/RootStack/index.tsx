import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { MangaDetail } from '../../Views/MangaDetail';
import { MangaReader } from '../../Views/MangaReader';
import { RootStackParamList } from './paramList';
import { ListMangaView } from '../../Views/ListMangaView';
import { MainTabs } from '../MainTabs';
import AppViews from '../AppViews';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      screenOptions={() => ({
        headerShown: false,
        statusBarTranslucent: true,
      })}>
      <RootStack.Screen name={AppViews.MAIN_TABS} component={MainTabs} />
      <RootStack.Screen
        name={AppViews.LIST_MANGA_VIEW}
        component={ListMangaView}
      />
      <RootStack.Screen name={AppViews.MANGA_DETAIL} component={MangaDetail} />
      <RootStack.Screen name={AppViews.MANGA_READER} component={MangaReader} />
    </RootStack.Navigator>
  );
};
