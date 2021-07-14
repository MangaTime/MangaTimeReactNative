import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMangaDetail,
  getMangadexHomeBaseUrl,
  getUpdatedManga,
} from '../../Services/mangaService';
import { Chapter, Manga, Volume } from './interfaces';

export interface MangaState {
  recentlyUpdatedManga?: Manga[];
  recentlyAddedManga?: Manga[];
  mangaDetail?: Manga;
  readingChapter?: Chapter;
  baseUrl?: string;
}
const initialState: MangaState = {
  recentlyUpdatedManga: [],
  recentlyAddedManga: [],
};

export const fetchUpdatedManga = createAsyncThunk(
  'manga/fetchUpdatedManga',
  async () => {
    return getUpdatedManga();
  },
);

export const fetchMangaDetail = createAsyncThunk(
  'manga/fetchMangaDetail',
  async (manga: Manga) => {
    return getMangaDetail(manga.id);
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

    builder.addCase(fetchUpdatedManga.fulfilled, (s, action) => {
      const state = s;
      state.recentlyUpdatedManga = action.payload.results?.map((e) => {
        const item = {
          id: e.data?.id,
          name: e.data?.attributes?.title?.en, // get only english title and description for now
          description: e.data?.attributes?.description?.en,
          cover_art: e.relationships?.find((e1) => e1.type === 'cover_art')
            ?.attributes?.fileName,
        };
        return item as Manga;
      });
    });

    builder.addCase(fetchMangaDetail.fulfilled, (s, action) => {
      const state = s;
      const mangaDetail = { ...action.meta.arg };
      const volumes: Volume[] = [];
      const chapters: Chapter[] = [];
      action.payload.results?.forEach((item) => {
        const volumeName = item.data?.attributes?.volume ?? 'unknown';
        let volume: Volume | undefined = volumes.find(
          (v) => v.name === volumeName,
        );
        if (!volume) {
          volume = {
            name: volumeName,
            chapters: [],
          };
          volumes.push(volume);
        }
        const chapter: Chapter = {
          name: item.data?.attributes?.chapter ?? 'unknown',
          id: item.data?.id ?? 'unknown',
          updatedAt: item.data?.attributes?.updatedAt ?? 'unknown',
          hash: item.data?.attributes?.hash ?? '',
          title: item.data?.attributes?.title,
          pages: item.data?.attributes?.data,
          volume: volume.name,
          manga: mangaDetail.id,
        };
        if (!volume.chapters) volume.chapters = [];
        volume.chapters.push(chapter);
        chapters.push(chapter);
      });
      mangaDetail.volumes = volumes;
      mangaDetail.chapters = chapters;
      state.mangaDetail = mangaDetail;
    });
  },
});

export const { loadChapter } = mangaSlice.actions;

export default mangaSlice.reducer;
