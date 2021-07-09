import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout, refreshToken } from '../../Services/userService';

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

export const refreshThunk = createAsyncThunk(
  'user/refresh',
  async ({ token }: { token: string }, thunkAPI) => {
    const response = await refreshToken(token);
    return response;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateToken: (
      state,
      action: PayloadAction<{ session?: string; refresh?: string }>,
    ): any => {
      state.refreshToken = action.payload.refresh;
      state.sessionToken = action.payload.session;
      if (!action.payload.session && !action.payload.refresh) {
        state.loggedIn = false;
        state.username = undefined;
      }
    },
  },
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

    builder.addCase(refreshThunk.fulfilled, (s, action) => {
      const state = s;
      if (action.payload.result == 'ok') {
        state.sessionToken = action.payload.token.session;
        state.refreshToken = action.payload.token.refresh;
      }
    });

    builder.addCase(logoutThunk.fulfilled, (s, action) => {
      const state = s;
      console.log(action.payload);
      if (action.payload.result == 'ok') {
        state.username = undefined;
        state.sessionToken = undefined;
        state.refreshToken = undefined;
        state.loggedIn = false;
      }
    });

    builder.addCase(logoutThunk.rejected, (s, action) => {
      const state = s;
      state.username = undefined;
      state.sessionToken = undefined;
      state.refreshToken = undefined;
      state.loggedIn = false;
    });
  },
});

export const { updateToken } = userSlice.actions;

export default userSlice.reducer;
