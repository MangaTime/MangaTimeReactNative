import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AllSections {
  recentlyUpdated?: boolean;
  following?: boolean;
  recentlyAdded?: boolean;
  random?: boolean;
}
export interface AppSettingsSlice {
  visibility: AllSections;
}
const initialState: AppSettingsSlice = {
  visibility: {
    recentlyAdded: true,
    recentlyUpdated: true,
    following: true,
    random: true,
  },
};
export const appSettingsSlice = createSlice({
  name: 'appSetting',
  initialState,
  reducers: {
    updateVisibility(s, action: PayloadAction<AllSections>) {
      const state = s;
      state.visibility = action.payload;
    },
  },
});

export const { updateVisibility } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
