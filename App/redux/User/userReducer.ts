import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import SupportedSources from '../../Services/MangaSources/supportedSources';
import {
  ServiceAuthenticationInformation,
} from './interfaces';
import { MangaSources } from '../../Services/MangaSources';

export type UserState = {
  [key in keyof SupportedSources]?: ServiceAuthenticationInformation;
};

const initialState: UserState = {
  // loggedIn: false,
};

interface LoginPayload<K extends keyof SupportedSources>{
  source: K;
    username: string;
    password: string;
}
interface LogoutPayload<K extends keyof SupportedSources>{
  source: K
}
export const loginThunk = (<K extends keyof SupportedSources>() => createAsyncThunk<ServiceAuthenticationInformation|undefined, LoginPayload<K>, {state: UserState}>(
  'user/login',
  async ({ source, username, password }: LoginPayload<K>) => {
    const mangaSource = MangaSources[source];
    if(mangaSource.user.login){
      return mangaSource.user.login({username, password});
    }
  },
))();

export const logoutThunk = (<K extends keyof SupportedSources>() => createAsyncThunk<unknown, LogoutPayload<K>, {}>('user/logout', async ({ source }: LogoutPayload<K>) => {
  const mangaSource = MangaSources[source];
  if(mangaSource.user.logout){
    return mangaSource.user.logout();
  }
}))();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateToken: <K extends keyof UserState>(
      s: UserState,
      action: PayloadAction<{source: K, session?: string; refresh?: string }>,
    ) => {
      const state = s;
      const sourceSpecificState : (ServiceAuthenticationInformation | undefined) = state[action.payload.source]
      if(sourceSpecificState){
        sourceSpecificState.additional.refreshToken = action.payload.refresh;
        sourceSpecificState.additional.sessionToken = action.payload.session;
        if (!action.payload.session && !action.payload.refresh) {
          sourceSpecificState.additional = {}
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loginThunk.fulfilled, (s: UserState, action) => {
      // Add user to the state array
      const state = s;
      if (action.payload?.additional.sessionToken) {
        state[action.meta.arg.source] = action.payload;
      } else {
        state[action.meta.arg.source] = undefined
      }
    });

    builder.addCase(logoutThunk.fulfilled, (s:UserState, action) => {
      const state = s;
        state[action.meta.arg.source] = undefined
    });

    builder.addCase(logoutThunk.rejected, (s:UserState,action) => {
      const state = s;
      state[action.meta.arg.source] = undefined
    });
  },
});

export const { updateToken } = userSlice.actions;

export default userSlice.reducer;
