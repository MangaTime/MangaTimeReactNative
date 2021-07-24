import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '../redux/Hooks';
import { Browse } from '../Views/Browse';
import { Settings } from '../Views/Settings';
import AppViews from './AppViews';
import { HomeStackScreen } from './HomeStack';
import { navigationRef } from './navigationRef';
import { BrowseStackScreen } from './BrowseStack';

const Tab = createMaterialBottomTabNavigator();
export const Navigator = () => {
  const { theme } = useAppSelector((state) => state.persist.theme);
  const navTheme = { ...theme, dark: false };

  return (
    <NavigationContainer theme={navTheme} ref={navigationRef}>
      <Tab.Navigator shifting>
        <Tab.Screen
          name={AppViews.HOME}
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name={AppViews.BROWSE}
          component={BrowseStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="library-books" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name={AppViews.SETTINGS}
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="settings" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
