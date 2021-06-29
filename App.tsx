import React from 'react';
import { Provider } from 'react-redux';
import { Navigator } from './App/Navigator';
import store from './App/redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
