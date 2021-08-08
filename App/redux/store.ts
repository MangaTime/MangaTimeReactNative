/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Action,
  AnyAction,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import client from '../Services/baseClient';
import interceptorInit from '../Services/interceptorInit';
import reducers from './reducers';

export const store = configureStore({
  reducer: reducers,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    __DEV__ && require('redux-flipper').default(),
  ],
});

interceptorInit(client, store);

export const persistor = persistStore(store);

export type AppDispatch = ThunkDispatch<unknown, unknown, AnyAction>; // changed from "typeof store.dispatch"; to support thunk dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
