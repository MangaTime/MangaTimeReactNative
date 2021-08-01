import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ReactElement } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '../../redux/Hooks';
import AppViews from '../AppViews';
import { SettingsStackScreen } from '../SettingsStack';
import { RootState } from '../../redux/store';
import { Home } from '../../Views/Home';
import { Browse } from '../../Views/Browse';

const Tab = createMaterialBottomTabNavigator();

export const MainTabs = (): ReactElement => {
  const { theme } = useAppSelector((state: RootState) => state.persist.theme);

  return (
    <Tab.Navigator shifting activeColor={theme.colors.text}>
      <Tab.Screen
        name={AppViews.HOME}
        component={Home}
        options={{
          tabBarIcon: () => (
            <Icon name="home" color={theme.colors.text} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={AppViews.BROWSE}
        component={Browse}
        options={{
          tabBarIcon: () => (
            <Icon name="library-books" color={theme.colors.text} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={AppViews.SETTINGS}
        component={SettingsStackScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="settings" color={theme.colors.text} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
