import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Chapter, Manga } from './interfaces';
import { MangaSources } from '../../Services/MangaSources';
import { createFetchMangaThunkCallback } from './utils';

export interface MangaState {
  recentlyUpdatedManga?: Manga[];
  recentlyAddedManga?: Manga[];
  randomManga?: Manga[];
  mangaDetail?: Manga;
  readingChapter?: Chapter;
  baseUrl?: string;
}
const initialState: MangaState = {
  recentlyUpdatedManga: [],
  recentlyAddedManga: [],
  randomManga: [],
};

export const fetchUpdatedManga = createAsyncThunk(
  'manga/fetchUpdatedManga',
  createFetchMangaThunkCallback((mangaSource) =>
    mangaSource.manga.getUpdatedManga?.(0, 10),
  ),
);

export const fetchAddedManga = createAsyncThunk(
  'manga/fetchAddedManga',
  createFetchMangaThunkCallback((mangaSource) =>
    mangaSource.manga.getAddedManga?.(0, 10),
  ),
);

export const fetchRandomManga = createAsyncThunk(
  'manga/fetchRandomManga',
  createFetchMangaThunkCallback((mangaSource) =>
    mangaSource.manga.getRandomManga?.(10),
  ),
);

export const fetchMangaDetail = createAsyncThunk(
  'manga/fetchMangaDetail',
  async (manga: Manga) => {
    return MangaSources['MangaDex'].manga.getMangaDetail?.(manga);
  },
);

// export const fetchMangadexHomeBaseUrl = createAsyncThunk(
//   'manga/fetchMangadexHomeBaseUrl',
//   async (chapter: Chapter) => {
//     return getMangadexHomeBaseUrl(chapter.id);
//   },
// );

export const mangaSlice = createSlice({
  name: 'manga',
  initialState,
  reducers: {
    loadChapter: (s, action) => {
      const state = s;
      state.readingChapter = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchMangadexHomeBaseUrl.fulfilled, (s, action) => {
    //   const state = s;
    //   state.baseUrl = action.payload.baseUrl;
    // });

    builder.addCase(fetchAddedManga.fulfilled, (s, action) => {
      const state = s;
      state.recentlyAddedManga = action.payload;
    });

    builder.addCase(fetchRandomManga.fulfilled, (s, action) => {
      const state = s;
      state.randomManga = action.payload;
    });

    builder.addCase(fetchUpdatedManga.fulfilled, (s, action) => {
      const state = s;
      state.recentlyUpdatedManga = action.payload;
    });

    builder.addCase(fetchMangaDetail.fulfilled, (s, action) => {
      const state = s;
      state.mangaDetail = action.payload;
    });
  },
});

export const { loadChapter } = mangaSlice.actions;

export default mangaSlice.reducer;
