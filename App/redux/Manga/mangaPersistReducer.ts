import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Platform } from 'react-native';

import {
  getAllFollowingManga,
  getFollowingChapterFeed,
} from '../../Services/mangaService';
import { Chapter, Manga } from './interfaces';

// import PushNotification from 'react-native-push-notification';
const PushNotification =
  Platform.OS === 'android'
    ? // eslint-disable-next-line import-order-alphabetical/order
      require('react-native-push-notification')
    : undefined;

export interface MangaPersistState {
  followingFeed?: Chapter[];
  followingManga?: Manga[];
}
const initialState: MangaPersistState = {};

export const fetchFollowingChapterFeed = createAsyncThunk(
  'manga/fetchFollowingChapterFeed',
  async () => {
    return getFollowingChapterFeed();
  },
);

export const fetchFollowingManga = createAsyncThunk(
  'manga/fetchFollowingManga',
  async () => {
    return getAllFollowingManga();
  },
);

export const mangaPersistSlice = createSlice({
  name: 'manga',
  initialState,
  reducers: {
    popFirstChapterFeed: (state) => {
      state.followingFeed?.shift();
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    // move this parser code to a separate helper function
    builder.addCase(fetchFollowingChapterFeed.fulfilled, (s, action) => {
      const state = s;
      const fetchedChapters = action.payload;
      fetchedChapters.forEach((c) => {
        const chapter = c;
        if (typeof chapter.manga === 'string') {
          // get manga information from (to be) persisted following manga list
          const mangaId = chapter.manga;
          const mangaInfo = state.followingManga?.find((e) => e.id === mangaId);
          chapter.manga = mangaInfo;
        }
      });
      // if state is not empty, compare fetched list with state, any extra objects from the fetched list is updated
      if (state.followingFeed) {
        const oldIds = state.followingFeed.map((e) => e.id);
        fetchedChapters
          ?.filter((e) => !oldIds.includes(e.id))
          .forEach((chapter) => {
            // send push notifications
            if (Platform.OS === 'android') {
              PushNotification.localNotification({
                channelId: 'channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
                title: `${
                  typeof chapter.manga === 'object'
                    ? (chapter.manga as Manga).name
                    : 'Unknown'
                }`,
                message: `Chapter ${chapter.name} ${
                  chapter.title ? `- ${chapter.title}` : ''
                }`, // (required)
                subText: 'New chapter',
                group: 'new-manga', // (optional) add group to message
                userInfo: chapter,
              });

              PushNotification.localNotification({
                id: 0,
                channelId: 'channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
                message: `Summary`, // (required)
                subText: 'New chapters',
                group: 'new-manga', // (optional) add group to message
                groupSummary: true,
              });
            }
          });
      }
      // save the fetched list to the state
      // NOTE: for testing: shift 2 first chapters from the list, in order to show notification as "new chapter" for them
      if (!state.followingFeed) {
        fetchedChapters?.shift();
        fetchedChapters?.shift();
        fetchedChapters?.shift();
      }
      state.followingFeed = fetchedChapters;
    });

    builder.addCase(fetchFollowingManga.fulfilled, (s, action) => {
      // Add user to the state array
      const state = s;
      const fetchedFollowingList = action.payload;
      fetchedFollowingList.forEach((item) => {
        if (!state.followingManga) state.followingManga = [];
        const oldDataIndex = state.followingManga.findIndex(
          (manga) => manga.id === item.id,
        );
        // add if not exists, update if exists, dont remove if removed on API (the sync-up function will be put in setting page)
        if (oldDataIndex === -1) {
          state.followingManga.push(item);
        } else {
          state.followingManga[oldDataIndex] = item;
        }
      });
    });
  },
});

export const { popFirstChapterFeed } = mangaPersistSlice.actions;

export default mangaPersistSlice.reducer;
