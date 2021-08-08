import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { SettingsStackParamList } from './paramList';
import { Settings } from '../../Views/Settings';
import { SectionVisibilitiesAndOrderingPage } from '../../Views/SectionVisibilitiesAndOrderingPage';
import AppViews from '../AppViews';

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={() => ({
        headerShown: false,
        statusBarTranslucent: true,
      })}>
      <SettingsStack.Screen name={AppViews.SETTINGS} component={Settings} />
      <SettingsStack.Screen
        name={AppViews.SECTION_VISIBILITIES_AND_ORDERING}
        component={SectionVisibilitiesAndOrderingPage}
      />
    </SettingsStack.Navigator>
  );
};
