import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from 'redux-persist';
import counterReducer from './Counter/counterReducer';
import mangaReducer from './Manga/mangaReducer';
import themeReducer from './Theme/themeReducer';
import userReducer from './User/userReducer';
import mangaPersistReducer from './Manga/mangaPersistReducer';
import appSettingsReducer from './AppSettings/appSettingsReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistReducers = {
  counter: counterReducer,
  user: userReducer,
  theme: themeReducer,
  manga: mangaPersistReducer,
  appSetting: appSettingsReducer,
};
const persist = persistCombineReducers(persistConfig, persistReducers);
const reducers = {
  persist,
  mangaReducer,
};
export default reducers;
