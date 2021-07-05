import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from 'redux-persist';
import counterReducer from './Counter/counterReducer';
import mangaReducer from './Manga/mangaReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistReducers = { counter: counterReducer };
const persist = persistCombineReducers(persistConfig, persistReducers);
const reducers = {
  persist,
  mangaReducer,
};
export default reducers;
