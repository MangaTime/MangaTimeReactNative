import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMangaDetail, getUpdatedManga } from '../../Services/mangaService';
import { Chapter, Manga, Volume } from './interfaces';

export interface MangaState {
  recentlyUpdatedManga?: Manga[];
  recentlyAddedManga?: Manga[];
  mangaDetail?: Manga;
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
  },
});

// export const { increment, decrement, incrementByAmount } = mangaSlice.actions;

export default mangaSlice.reducer;
