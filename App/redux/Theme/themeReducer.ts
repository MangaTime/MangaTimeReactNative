import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppTheme, ThemeName } from '../../Theme';

export interface ThemeState {
  theme: any;
  themeName: string;
}
const initialState: ThemeState = {
  theme: AppTheme.White,
  themeName: ThemeName.White,
};
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state: ThemeState, action: PayloadAction<any>) => {
      return {
        ...state,
        theme: action.payload.theme,
        themeName: action.payload.themeName,
      };
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
