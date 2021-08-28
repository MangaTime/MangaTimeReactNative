import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from 'redux-persist';
import appSettingsReducer from './AppSettings/appSettingsReducer';
import mangaPersistReducer from './Manga/mangaPersistReducer';
import mangaReducer from './Manga/mangaReducer';
import themeReducer from './Theme/themeReducer';
import userReducer from './User/userReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistReducers = {
  user: userReducer,
  theme: themeReducer,
  manga: mangaPersistReducer,
  appSetting: appSettingsReducer,
};
const persist = persistCombineReducers(persistConfig, persistReducers);
const reducers = {
  persist,
  manga: mangaReducer,
};
export default reducers;
