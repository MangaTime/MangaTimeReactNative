import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import counterReducer from './Counter/counterReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistReducers = { counter: counterReducer };
const persist = persistCombineReducers(persistConfig, persistReducers);
const reducers = combineReducers({
  persist,
});
export default reducers;
