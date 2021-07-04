import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Manga {
    name: string;
    description: string;
}
export interface MangaState {
    recentlyUpdatedManga: Manga[];
    recentlyAddedManga: Manga[];
}
const initialState: MangaState = {
    recentlyUpdatedManga: [],
    recentlyAddedManga: []
};

export const fetchUpdatedManga = createAsyncThunk(
    'manga/fetchUpdatedManga',
    async (userId, thunkAPI) => {
        const response = fetch("http://api.mangadex.org/manga?limit=3&order[updatedAt]=desc").then(res => res.json())
        return response
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
            state.recentlyUpdatedManga = (action.payload['results'] as any[]).map(e => {
                return {
                    name: e.data.attributes.title.en, // get only english title and description for now
                    description: e.data.attributes.description.en,
                    cover_art: (e.relationships as any[]).find(e=>e.type=="cover_art")?.id
                }
            })
            console.log(state.recentlyUpdatedManga)
        })
    },
});

// export const { increment, decrement, incrementByAmount } = mangaSlice.actions;

export default mangaSlice.reducer;
