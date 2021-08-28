import BackgroundFetch from 'react-native-background-fetch';
import { AnyAction, EnhancedStore, ThunkDispatch } from '@reduxjs/toolkit';
import {
  fetchFollowingChapterFeed,
  fetchFollowingManga,
} from './redux/Manga/mangaPersistReducer';

export const UpdateManga = async (store: EnhancedStore) => {
  // TODO: check if user logged in (tokens exist in persisted user state)
  type MyThunkDispatch = ThunkDispatch<{}, {}, AnyAction>;
  const thunkDispatch = store.dispatch as MyThunkDispatch;
  await thunkDispatch(fetchFollowingManga());
  await thunkDispatch(fetchFollowingChapterFeed(['MangaDex']));
};

export const HeadlessUpdateMangaTask = async (
  store: EnhancedStore,
  event: any,
) => {
  // Get task id from event {}:
  const { taskId } = event;
  const isTimeout = event.timeout; // <-- true when your background-time has expired.
  if (isTimeout) {
    // This task has exceeded its allowed running-time.
    // You must stop what you're doing immediately finish(taskId)
    BackgroundFetch.finish(taskId);
    return;
  }
  while (!store.getState()?.persist?._persist?.rehydrated) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await UpdateManga(store);
  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  BackgroundFetch.finish(taskId);
};

export const initBackgroundFetch = async (store: EnhancedStore) => {
  // BackgroundFetch event handler.
  const onEvent = async (taskId: string) => {
    await UpdateManga(store);
    // IMPORTANT:  You must signal to the OS that your task is complete.
    BackgroundFetch.finish(taskId);
  };

  // Timeout callback is executed when your Task has exceeded its allowed running-time.
  // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
  const onTimeout = async (taskId: string) => {
    BackgroundFetch.finish(taskId);
  };

  // Initialize BackgroundFetch only once when component mounts.
  const status = await BackgroundFetch.configure(
    {
      minimumFetchInterval: 15,
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
    },
    onEvent,
    onTimeout,
  );
};
