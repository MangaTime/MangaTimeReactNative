import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   getAddedManga,
//   getMangaDetail,
//   getMangadexHomeBaseUrl,
//   getRandomManga,
//   getUpdatedManga,
// } from '../../Services/mangaService';
import { Chapter, Manga } from './interfaces';
import SupportedSources from '../../Services/MangaSources/supportedSources';
import { MangaSources } from '../../Services/MangaSources';

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

export const fetchUpdatedManga = (<K extends keyof SupportedSources>() =>
  createAsyncThunk(
    'manga/fetchUpdatedManga',
    async (source: K | undefined = undefined) => {
      if (!source) {
        return Promise.all(
          Object.values(MangaSources).map((e) =>
            e.manga.getUpdatedManga
              ? e.manga.getUpdatedManga(0, 10)
              : Promise.resolve([]),
          ),
        ).then((allResult) =>
          allResult.reduce(
            (accumulator, value) => accumulator.concat(value),
            [],
          ),
        );

        // return getUpdatedManga();
      } else {
        const mangaSource = MangaSources[source]
        return mangaSource.manga.getUpdatedManga
          ? mangaSource.manga.getUpdatedManga(0, 10)
          : [];
      }
    },
  ))();

export const fetchAddedManga = createAsyncThunk(
  'manga/fetchAddedManga',
  async () => {
    return getAddedManga();
  },
);

export const fetchRandomManga = createAsyncThunk(
  'manga/fetchRandomManga',
  async () => {
    return getRandomManga();
  },
);

export const fetchMangaDetail = createAsyncThunk(
  'manga/fetchMangaDetail',
  async (manga: Manga) => {
    return getMangaDetail(manga);
  },
);

export const fetchMangadexHomeBaseUrl = createAsyncThunk(
  'manga/fetchMangadexHomeBaseUrl',
  async (chapter: Chapter) => {
    return getMangadexHomeBaseUrl(chapter.id);
  },
);

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
    builder.addCase(fetchMangadexHomeBaseUrl.fulfilled, (s, action) => {
      const state = s;
      state.baseUrl = action.payload.baseUrl;
    });

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
