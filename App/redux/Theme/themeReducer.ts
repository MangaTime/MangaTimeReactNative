import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppTheme } from '../../Theme';

export interface ThemeState {
  theme: any;
}
const initialState: ThemeState = {
  theme: AppTheme.White,
};
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state: ThemeState, action: PayloadAction<any>) => {
      return { ...state, theme: action.payload };
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
