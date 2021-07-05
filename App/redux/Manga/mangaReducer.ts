import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFollowingManga,
  getMangaDetail,
  getUpdatedManga,
} from '../../Services/mangaService';

export interface Chapter {
  name: string;
}
export interface Volume {
  name: string;
  chapters?: Chapter[];
}
export interface Manga {
  id: string;
  name: string;
  description: string;
  cover_art: string;
  volumes?: Volume[];
}
export interface MangaState {
  recentlyUpdatedManga: Manga[];
  recentlyAddedManga: Manga[];
  followingManga: Manga[];
  mangaDetail?: Manga;
}
const initialState: MangaState = {
  recentlyUpdatedManga: [],
  recentlyAddedManga: [],
  followingManga: [],
};

export const fetchUpdatedManga = createAsyncThunk(
  'manga/fetchUpdatedManga',
  async (arg, thunkAPI) => {
    return getUpdatedManga();
  },
);

export const fetchMangaDetail = createAsyncThunk(
  'manga/fetchMangaDetail',
  async (manga: Manga, thunkAPI) => {
    return getMangaDetail(manga.id);
  },
);

export const fetchFollowingManga = createAsyncThunk(
  'manga/fetchFollowingManga',
  async (arg, thunkAPI) => {
    return getFollowingManga();
  },
);

export const mangaSlice = createSlice({
  name: 'manga',
  initialState,
  reducers: {
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    // TODO: move this parser code to a separate helper function
    builder.addCase(fetchUpdatedManga.fulfilled, (s, action) => {
      // Add user to the state array
      const state = s;
      state.recentlyUpdatedManga = (action.payload.results as any[]).map(
        (e) => {
          const item = {
            id: e.data.id,
            name: e.data.attributes.title.en, // get only english title and description for now
            description: e.data.attributes.description.en,
            cover_art: (e.relationships as any[]).find(
              (e) => e.type == 'cover_art',
            )?.attributes?.fileName,
          };
          return item;
        },
      );
    });

    builder.addCase(fetchMangaDetail.fulfilled, (s, action) => {
      // Add user to the state array
      const state = s;
      const mangaDetail = action.meta.arg;
      const volumes = Object.entries(action.payload.volumes).map(
        ([key, value]) => {
          return {
            name: key,
            chapters: Object.entries((value as any).chapters).map(
              ([ckey, cvalue]) => {
                return {
                  name: ckey,
                } as Chapter;
              },
            ),
          } as Volume;
        },
      );
      state.mangaDetail = { ...mangaDetail, volumes };
    });

    // TODO: move this parser code to a separate helper function
    builder.addCase(fetchFollowingManga.fulfilled, (s, action) => {
      // Add user to the state array
      const state = s;
      state.followingManga = (action.payload.results as any[]).map((e) => {
        const item = {
          id: e.data.id,
          name: e.data.attributes.title.en, // get only english title and description for now
          description: e.data.attributes.description.en,
          cover_art: (e.relationships as any[]).find(
            (e) => e.type == 'cover_art',
          )?.attributes?.fileName,
        };
        return item;
      });
    });
  },
});

// export const { increment, decrement, incrementByAmount } = mangaSlice.actions;

export default mangaSlice.reducer;
