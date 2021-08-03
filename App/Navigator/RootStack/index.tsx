import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { MangaDetail } from '../../Views/MangaDetail';
import { MangaReader } from '../../Views/MangaReader';
import { RootStackParamList } from './paramList';
import { ListMangaView } from '../../Views/ListMangaView';
import { MainTabs } from '../MainTabs';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      screenOptions={() => ({
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
