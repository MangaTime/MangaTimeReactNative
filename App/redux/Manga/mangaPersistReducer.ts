import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAllFollowingManga,
  getFollowingChapterFeed,
} from '../../Services/mangaService';
import { processFollowingChapterFeed } from '../../Utils/processFollowingChapterFeed';
import { Chapter, Manga } from './interfaces';

export interface MangaPersistState {
  followingFeed?: Chapter[];
  followingManga?: Manga[];
}
const initialState: MangaPersistState = {};

export const fetchFollowingChapterFeed = createAsyncThunk(
  'manga/fetchFollowingChapterFeed',
  async () => {
    const data = await getFollowingChapterFeed();
    const processedData = processFollowingChapterFeed(data);
    return processedData;
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
    builder.addCase(fetchFollowingChapterFeed.fulfilled, (s, action) => {
      const state = s;
      const fetchedChapters = action.payload;
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
