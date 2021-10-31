import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PushNotification from 'react-native-push-notification';
import {
  getAllFollowingManga,
  getFollowingChapterFeed,
} from '../../Services/mangaService';
import { Platform } from 'react-native';
import SupportedSources from '../../Services/MangaSources/supportedSources';

// import {
//   getAllFollowingManga,
//   getFollowingChapterFeed,
// } from '../../Services/mangaService';
import { Chapter, Manga } from './interfaces';
import { arrayIntersect, createFetchMangaThunkCallback } from './utils';

export interface MangaPersistState {
  followingFeed?: Chapter[];
  followingManga?: Manga[];
}
const initialState: MangaPersistState = {};

export const fetchFollowingChapterFeed = (<
  K extends keyof SupportedSources,
>() =>
  createAsyncThunk(
    'manga/fetchFollowingChapterFeed',
    (sources: K[], thunkAPI) => {
      const followingManga =
        (
          thunkAPI.getState() as {
            persist: {
              manga: MangaPersistState;
            };
          }
        ).persist.manga.followingManga ?? [];
      return createFetchMangaThunkCallback((mangaSource) =>
        mangaSource.manga.getFollowingChapterFeed(followingManga),
      )(sources);
    },
  ))();

export const fetchFollowingManga = createAsyncThunk(
  'manga/fetchFollowingManga',
  createFetchMangaThunkCallback((mangaSource) =>
    mangaSource.manga.getAllFollowingManga?.(),
  ),
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
    // move this parser code to a separate helper function
    builder.addCase(fetchFollowingChapterFeed.fulfilled, (s, action) => {
      const state = s;
      const fetchedChapters = action.payload as Chapter[];
      fetchedChapters.forEach((c) => {
        const chapter = c;
        if (typeof chapter.manga === 'string') {
          // get manga information from (to be) persisted following manga list
          const mangaId = chapter.sourceInfo?.[0]?.MangaDex?.manga;
          const mangaInfo = state.followingManga?.find(
            (m) => m.sourceInfo?.MangaDex?.id === mangaId,
          );
          chapter.manga = mangaInfo;
        }
      });
      // if state is not empty, compare fetched list with state, any extra objects from the fetched list is updated
      if (state.followingFeed) {
        const oldIds = state.followingFeed.map((e) => e.name);
        fetchedChapters
          ?.filter((e) => !oldIds.includes(e.name))
          .forEach((chapter) => {
            // send push notifications

            PushNotification.localNotification({
              channelId: 'channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
              title: `${
                typeof chapter.manga === 'object'
                  ? (chapter.manga as Manga).names[0]
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
      const state: MangaPersistState = s;
      const fetchedFollowingList = action.payload;

      // TODO: merge fetched following list with existing following list in the state

      fetchedFollowingList.forEach((item) => {
        if (!state.followingManga) state.followingManga = [];
        const oldDataIndex = state.followingManga.findIndex((manga) =>
          arrayIntersect(manga.names, (item as Manga).names),
        );
        // const oldDataIndex = state.followingManga.findIndex(
        //   (manga) => manga.id === item.id,
        // );
        // add if not exists, update if exists, dont remove if removed on API (the sync-up function will be put in setting page)
        if (oldDataIndex === -1) {
          state.followingManga.push(item as Manga);
        } else {
          state.followingManga[oldDataIndex] = {
            ...state.followingManga[oldDataIndex],
            ...(item as Manga), // prioritize newly fetched data
            sourceInfo: {
              ...state.followingManga[oldDataIndex].sourceInfo,
              ...(item as Manga).sourceInfo, // merge sourceInfo if possible, prioritize newly fetched data
            },
          };
        }
      });
    });
  },
});

export const { popFirstChapterFeed } = mangaPersistSlice.actions;

export default mangaPersistSlice.reducer;
