import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout } from '../../Services/userService';

export interface UserState {
  loggedIn: boolean;
  username?: string;
  sessionToken?: string;
  refreshToken?: string;
}

const initialState: UserState = {
  loggedIn: false,
};

export const loginThunk = createAsyncThunk(
  'user/login',
  async ({ username, password }: any, thunkAPI) => {
    const response = await login(username, password);
    return response;
  },
);

export const logoutThunk = createAsyncThunk(
  'user/logout',
  async (arg, thunkAPI) => {
    // const user = (thunkAPI.getState() as any).persist.user as any;
    // const token = user.sessionToken;
    const response = await logout();
    return response;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loginThunk.fulfilled, (s, action) => {
      // Add user to the state array
      const state = s;
      console.log(action.payload);
      if (action.payload.result == 'ok') {
        state.username = action.meta.arg.username;
        state.sessionToken = action.payload.token.session;
        state.refreshToken = action.payload.token.refresh;
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
      }
    });

    builder.addCase(logoutThunk.fulfilled, (s, action) => {
      // Add user to the state array
      const state = s;
      console.log(action.payload);
      if (action.payload.result == 'ok') {
        state.username = undefined;
        state.sessionToken = undefined;
        state.refreshToken = undefined;
        state.loggedIn = false;
      }
    });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default userSlice.reducer;
