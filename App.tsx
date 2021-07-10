import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Navigator } from './App/Navigator';
import { persistor, store } from './App/redux/store';

// Default theme obj
// const DefaultTheme: Theme = {
//   dark: false,
//   roundness: 4,
//   colors: {
//     primary: '#6200ee', //Color
//     accent: '#03dac4',  //Dark
//     background: '#f6f6f6', //Light
//     surface: white,
//     error: '#B00020',
//     text: black,
//     onSurface: '#ffffff',
//     disabled: color(black).alpha(0.26).rgb().string(),
//     placeholder: color(black).alpha(0.54).rgb().string(),
//     backdrop: color(black).alpha(0.5).rgb().string(),
//     notification: pinkA400,
//   },
//   fonts: configureFonts(),
//   animation: {
//     scale: 1.0,
//   },
// };

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#212121',
    accent: '#000000',
    background: '#484848',
    text: '#ffffff',
  },
};
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={theme}>
          <Navigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
