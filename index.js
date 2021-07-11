// ALWAYS HAVE GESTURE-HANDLER ON TOP
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import BackgroundFetch from 'react-native-background-fetch';
import { store } from './App/redux/store';
import { incrementByAmount } from './App/redux/Counter/counterReducer';
import getStoredState from 'redux-persist/es/getStoredState';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from 'react-native-push-notification';
import {
  HeadlessUpdateMangaTask,
  initBackgroundFetch,
} from './App/configBackgroundWork';

PushNotification.createChannel({
  channelId: 'channel-id', // (required)
  channelName: 'My channel', // (required)
  channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
  playSound: false, // (optional) default: true
  soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
});
// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    // TODO: process the notification (open the app -> show chapter in the reader)
    console.log('NOTIFICATION:', notification);

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(HeadlessUpdateMangaTask.bind(null, store));
initBackgroundFetch(store);
