//ALWAYS HAVE GESTURE-HANDLER ON TOP
import React from 'react';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { name as appName } from './app.json';
import { persistor, store } from './App/redux/store';
const ReduxProvider = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxProvider);
