import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
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
    mangaDetail?: Manga;
}
const initialState: MangaState = {
    recentlyUpdatedManga: [],
    recentlyAddedManga: []
};

export const fetchUpdatedManga = createAsyncThunk(
    'manga/fetchUpdatedManga',
    async (userId, thunkAPI) => {
        const response = await axios.get("http://api.mangadex.org/manga?limit=3&order[updatedAt]=desc&includes[]=cover_art")
        return response.data
    }
)

export const fetchMangaDetail = createAsyncThunk(
    'manga/fetchMangaDetail',
    async (manga: Manga, thunkAPI) => {
        const response = await axios.get(`https://api.mangadex.org/manga/${manga.id}/aggregate`)
        return response.data
    }
)

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
        builder.addCase(fetchUpdatedManga.fulfilled, (state, action) => {
            // Add user to the state array
            console.log(action.payload)
            state.recentlyUpdatedManga = (action.payload.results as any[]).map(e => {
                const item = {
                    id: e.data.id,
                    name: e.data.attributes.title.en, // get only english title and description for now
                    description: e.data.attributes.description.en,
                    cover_art: (e.relationships as any[]).find(e => e.type == "cover_art")?.attributes?.fileName
                }
                console.log(`https://uploads.mangadex.org/covers/${item.id}/${item.cover_art}.256.jpg`)
                return item
            })
            console.log(state.recentlyUpdatedManga)
        })

        builder.addCase(fetchMangaDetail.fulfilled, (state, action) => {
            // Add user to the state array
            console.log(action.payload)
            let mangaDetail = action.meta.arg
            let volumes = Object.entries(action.payload.volumes).map(([key, value]) => {
                return {
                    name: key,
                    chapters: Object.entries((value as any).chapters).map(([ckey, cvalue]) => {
                        return {
                            name: ckey
                        } as Chapter
                    })
                } as Volume
            })
            state.mangaDetail = { ...mangaDetail, volumes }
            console.log(state.mangaDetail)
        })

    },
});

// export const { increment, decrement, incrementByAmount } = mangaSlice.actions;

export default mangaSlice.reducer;
