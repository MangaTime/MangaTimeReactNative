<<<<<<< HEAD
=======
import React, { useEffect } from 'react';
>>>>>>> 2153ff4 (new chapter notification on android)
import { Provider as PaperProvider } from 'react-native-paper';
import { Navigator } from './App/Navigator';
import { useAppSelector } from './App/redux/Hooks';

const App = () => {
  const { theme } = useAppSelector((state) => state.persist.theme);
  return (
    <PaperProvider theme={theme}>
      <Navigator />
    </PaperProvider>
  );
};

export default App;
