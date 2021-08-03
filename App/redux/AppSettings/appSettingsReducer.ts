import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Section {
  key: string;
  isVisible: boolean;
}
export interface AppSettingsSlice {
  sections: Section[];
}

const initialState: AppSettingsSlice = {
  sections: [
    {
      key: 'recentlyAdded',
      isVisible: true,
    },
    {
      key: 'recentlyUpdated',
      isVisible: true,
    },
    {
      key: 'following',
      isVisible: true,
    },
    {
      key: 'random',
      isVisible: true,
    },
  ],
};

export const appSettingsSlice = createSlice({
  name: 'appSetting',
  initialState,
  reducers: {
    updateSections(s, action: PayloadAction<Section[]>) {
      const state = s;
      state.sections = action.payload;
    },
    updateSectionVisibility(s, action: PayloadAction<Section>) {
      const state = s;
      state.sections = state.sections.map((e) =>
        e.key === action.payload.key ? action.payload : e,
      );
    },
  },
});

export const { updateSections, updateSectionVisibility } =
  appSettingsSlice.actions;

export default appSettingsSlice.reducer;
