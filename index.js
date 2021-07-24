// ALWAYS HAVE GESTURE-HANDLER ON TOP
import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { name as appName } from './app.json';
import { persistor, store } from './App/redux/store';
import BackgroundFetch from 'react-native-background-fetch';

import { LogBox } from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs([
  '*on the ref of an Animated component is no longer necessary.*',
]);

let PushNotification;
let PushNotificationIOS;
if (Platform.OS === 'android') {
  PushNotification = require('react-native-push-notification');
  // PushNotificationIOS = require('@react-native-community/push-notification-ios')
}
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification, { Importance } from 'react-native-push-notification';
import {
  HeadlessUpdateMangaTask,
  initBackgroundFetch,
} from './App/configBackgroundWork';
import { navigationRef } from './App/Navigator/navigationRef';
import { fetchMangaDetail, loadChapter } from './App/redux/Manga/mangaReducer';

if (Platform.OS === 'android') {
  PushNotification.createChannel({
    channelId: 'channel-id', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: PushNotification.Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  });
  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: async function (notification) {
      // TODO: use callback object in notification data?
      // process the notification (open the app -> show chapter in the reader)
      if (notification.id !== 0) {
        store.dispatch(loadChapter(notification.data));
        await store.dispatch(fetchMangaDetail(notification.data.manga));
        navigationRef.current.navigate('MangaReader');
      }
      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    // permissions: {
    //   alert: true,
    //   badge: true,
    //   sound: true,
    // },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });
}
const ReduxProvider = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxProvider);

if (Platform.OS === 'android') {
  // Register your BackgroundFetch HeadlessTask
  BackgroundFetch.registerHeadlessTask(
    HeadlessUpdateMangaTask.bind(null, store),
  );
  initBackgroundFetch(store);
}
